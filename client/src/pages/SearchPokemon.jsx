import React, { useState, useEffect } from "react";
import { Container, Col, Form, Button, Row } from "react-bootstrap";
import Auth from "../utils/auth";
import { savePokemonIds, getSavedPokemonIds } from "../utils/localStorage";
import { useMutation } from "@apollo/client";
import { SAVE_POKEMON } from "../utils/mutations";
import Ash from '../assets/pokemon-23.svg';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardImage,
  MDBCardText,
} from 'mdb-react-ui-kit';

const SearchPokemon = () => {
  const [searchedPokemon, setSearchedPokemon] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [savedPokemonIds, setSavedPokemonIds] = useState(getSavedPokemonIds());
  const [userRatings, setUserRatings] = useState({}); // State to store user ratings

  const [savePokemon] = useMutation(SAVE_POKEMON);

  useEffect(() => {
    return () => savePokemonIds(savedPokemonIds);
  }, [savedPokemonIds]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await fetch(
        `https://api.pokemontcg.io/v2/cards?q=name:${searchInput}&page=1&pageSize=25`
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const pokemonData = result.data.map((pokemonCard) => ({
        pokeId: pokemonCard.id,
        name: pokemonCard.name || ["No name to display"],
        pokedex: pokemonCard.nationalPokedexNumbers
          ? pokemonCard.nationalPokedexNumbers[0]
          : pokemonCard.nationalPokedexNumbers,
        image: pokemonCard.images.small,
        price: pokemonCard.cardmarket
          ? pokemonCard.cardmarket.prices.averageSellPrice
          : 0,
        description: pokemonCard.description,
        rating: userRatings[pokemonCard.id] || 0, // Get the user's rating or default to 0
      }));

      setSearchedPokemon(pokemonData);
      setSearchInput("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSavePokemon = async (pokemonToSave) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await savePokemon({
        variables: {
          pokemonData: {
            ...pokemonToSave,
            // Include the user's rating when saving a Pokemon
            rating: userRatings[pokemonToSave.pokeId] || 0,
          },
        },
      });

      if (!data) {
        throw new Error("Something went wrong!");
      }

      setSavedPokemonIds([...savedPokemonIds, pokemonToSave.pokeId]);
    } catch (err) {
      console.error(err);
    }
  };

  // Function to handle user rating input
  const handleRatingChange = (pokeId, rating) => {
    setUserRatings({
      ...userRatings,
      [pokeId]: rating,
    });
  };


  return (
    <>

  {/* Header */}

<header style={{ paddingLeft: 0 }}>
      <div
        className='p-5 text-center bg-image hero'
        style={{ backgroundImage: "url(https://images8.alphacoders.com/106/1060638.png)", height: 800 }}>
          <img src={Ash} alt="logo" className="d-flex justify-content-center align-items-center hero-dimension" />
      </div>
</header>
                 
       <div className='d-flex justify-content-center align-items-center h-100'>
        <Container>
          <h1 className="d-flex justify-content-center align-items-center h-100">Adopt a Pokemon!</h1>
          <Form className="d-flex justify-content-center align-items-center" onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search..."
                  className="d-flex justify-content-center align-items-center h-100"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button
                  className="button"
                  type="submit"
                  variant="success"
                  size="lg"
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>



    {/* Body */}


      <Container>
        <h2 className="pt-5 d-flex justify-content-center align-items-center h-100">
          {searchedPokemon.length
            ? `Showing ${searchedPokemon.length} Pokemon ready for adoption:`
            : "Adopt Today!"}
        </h2>

        <Row>
          {searchedPokemon.map((pokemon) => {
            return (
              <Col md="4" key={pokemon.pokeId}>
                <MDBCard className="card-color">
                  {pokemon.image ? (
                    <MDBCardImage
                      src={pokemon.image}
                      fluid
                      alt={`The cover for ${pokemon.name}`}
                      variant="top"
                    />
                  ) : null}
                  <MDBCardBody >
                    <MDBCardTitle>
                      <a
                        href={`https://www.google.com/search?q=${encodeURIComponent(
                          pokemon.name
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {pokemon.name}
                      </a>
                    </MDBCardTitle>
                    <MDBCardText>Pokedex #{pokemon.pokedex}</MDBCardText>
                    <MDBCardText>${pokemon.price}</MDBCardText>
                    <MDBCardText>
                      Rating:{" "}
                      <select
                        value={userRatings[pokemon.pokeId] || 0}
                        onChange={(e) =>
                          handleRatingChange(pokemon.pokeId, parseInt(e.target.value))
                        }
                      >
                        {Array.from({ length: 6 }, (_, i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                    </MDBCardText>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedPokemonIds?.some(
                          (savedPokemonId) =>
                            savedPokemonId === pokemon.pokeId
                        )}
                        className="btn-block btn-info button"
                        onClick={() => handleSavePokemon(pokemon)}
                      >
                        {savedPokemonIds?.some(
                          (savedPokemonId) =>
                            savedPokemonId === pokemon.pokeId
                        )
                          ? "Saved"
                          : "Save Pokemon"}
                      </Button>
                    )}
                  </MDBCardBody>
                </MDBCard>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SearchPokemon;



// import { useState, useEffect } from "react";
// import { Container, Col, Form, Button, Row } from "react-bootstrap";
// import Auth from "../utils/auth";
// import { savePokemonIds, getSavedPokemonIds } from "../utils/localStorage";
// import { useMutation } from "@apollo/client";
// import { SAVE_POKEMON } from "../utils/mutations";
// import {
//   MDBCard,
//   MDBCardBody,
//   MDBCardTitle,
//   MDBCardImage,
//   MDBCardText,
// } from 'mdb-react-ui-kit';


// const SearchPokemon = () => {
//   // create state for holding returned google api data
//   const [searchedPokemon, setSearchedPokemon] = useState([]);
//   // create state for holding our search field data
//   const [searchInput, setSearchInput] = useState("");

//   // create state to hold saved bookId values
//   const [savedPokemonIds, setSavedPokemonIds] = useState(getSavedPokemonIds());

//   const [savePokemon] = useMutation(SAVE_POKEMON);
//   // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
//   // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
//   useEffect(() => {
//     return () => savePokemonIds(savedPokemonIds);
//   });

//   // create method to search for books and set state on form submit
//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     if (!searchInput) {
//       return false;
//     }

//     try {
//       const response = await fetch(
//         `https://api.pokemontcg.io/v2/cards?q=name:${searchInput}&page=1&pageSize=25`
//       );
//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error("something went wrong!");
//       }
//       // console.log(result);
//       const pokemonData = result.data.map((pokemonCard) => ({
//         pokeId: pokemonCard.id,
//         name: pokemonCard.name || ["No name to display"],
//         pokedex: pokemonCard.nationalPokedexNumbers
//           ? pokemonCard.nationalPokedexNumbers[0]
//           : pokemonCard.nationalPokedexNumbers,
//         image: pokemonCard.images.small,
//         price: pokemonCard.cardmarket
//           ? pokemonCard.cardmarket.prices.averageSellPrice : 0,
//         description: pokemonCard.description,
//       }));

//       setSearchedPokemon(pokemonData);
//       setSearchInput("");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // create function to handle saving a pokemon to our database
//   const handleSavePokemon = async (pokemonToSave) => {
//     // find the pokemon in `searchedPokemon` state by the matching id

//     // const pokemonToSave = searchedPokemon.find(
//     //   (pokemonCard) => pokemonCard.pokeId === pokeId
//     // );

//     // get token
//     const token = Auth.loggedIn() ? Auth.getToken() : null;

//     if (!token) {
//       return false;
//     }

//     try {
//       const { data } = await savePokemon({
//         variables: {
//           pokemonData: pokemonToSave,
//           // pokeId: "si1-1",
//           // name: "Mew",
//           // pokedex: 151,
//           // price: 43.31,
//           // image: "https://images.pokemontcg.io/si1/1.png",
//         },
//       });
//       console.log("pokemonToSave", pokemonToSave);

//       if (!data) {
//         throw new Error("something went wrong!");
//       }

//       // if pokemon successfully saves to user's account, save pokemon id to state
//       setSavedPokemonIds([...savedPokemonIds, pokemonToSave.pokemonId]);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <>
//       <div className="text-light bg-dark p-5">
//         <Container>
//           <h1 >Adopt a Pokemon!</h1>
//           <Form onSubmit={handleFormSubmit}>
//             <Row>
//               <Col xs={12} md={8}>
//                 <Form.Control
//                   name="searchInput"
//                   value={searchInput}
//                   onChange={(e) => setSearchInput(e.target.value)}
//                   type="text"
//                   size="lg"
//                   placeholder="Search..."
//                 />
//               </Col>
//               <Col xs={12} md={4}>
//                 <Button className="button" type="submit" variant="success" size="lg">
//                   Submit
//                 </Button>
//               </Col>
//             </Row>
//           </Form>
//         </Container>
//       </div>
//       <Container>
//         <h2 className="pt-5">
//           {searchedPokemon.length
//             ? `Showing ${searchedPokemon.length} pokemon ready for a FURever home:`
//             : "Search for a pokemon to Adopt Today!"}
//         </h2>

// {/* Pokemon Cards */}

//         <Row>
//           {searchedPokemon.map((pokemon) => {
//             return (
//               <Col md="4" key={pokemon.pokemonId}>
//                 <MDBCard>
//                   {pokemon.image ? (
//                     <MDBCardImage
//                       src={pokemon.image}
//                       fluid alt={`The cover for ${pokemon.title}`}
//                       variant="top"
//                     />
//                   ) : null}
//                 <MDBCardBody>
//                 <MDBCardTitle>
//                   <p>{pokemon.name}</p>
//                 </MDBCardTitle>
//                 <MDBCardText>
//                   Pokedex #{pokemon.pokedex}
//                 </MDBCardText>
//                 <MDBCardText>
//                   ${pokemon.price}
//                 </MDBCardText>
//                     {Auth.loggedIn() && (
//                       <Button
//                         disabled={savedPokemonIds?.some(
//                           (savedPokemonId) =>
//                             savedPokemonId === pokemon.pokemonId
//                         )}
//                         className="btn-block btn-info button"
//                         onClick={() => handleSavePokemon(pokemon.pokemonId)}
//                       >
//                         {savedPokemonIds?.some(
//                           (savedPokemonId) =>
//                             savedPokemonId === pokemon.pokemonId
//                         )
//                           ? "This pokemon has already been saved!"
//                           : "Adopt this Pokemon!"}
//                       </Button>
//                     )}
//                   </MDBCardBody>
//                 </MDBCard>
//               </Col>
//             );
//           })}
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default SearchPokemon;
