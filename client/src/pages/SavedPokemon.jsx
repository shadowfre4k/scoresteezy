import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { QUERY_ME } from "../utils/queries";
import { REMOVE_POKEMON } from "../utils/mutations";
import Auth from "../utils/auth";
import { removePokemonId } from "../utils/localStorage";
import Ash from "../assets/pokemon-23.svg";

const SavedPokemon = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removePokemon] = useMutation(REMOVE_POKEMON);

  const userData = data?.me || {};



  // Create a state variable to store user ratings for saved Pokemon
  const [userRatings, setUserRatings] = useState({});

  // Function to handle user rating input
  const handleRatingChange = (pokeId, rating) => {
    setUserRatings({
      ...userRatings,
      [pokeId]: rating,
    });
  };

  // create function that accepts the Pokémon's mongo _id value as param and deletes the Pokémon from the database

  const handleDeletePokemon = async (pokemon) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await removePokemon({
        variables: { pokeId: pokemon.pokeId },
      });
      console.log(response);


      // upon success, remove Pokémon's id from localStorage

      removePokemonId(pokemon.pokeId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  // Display number of saved Pokémon, if no Pokémon saved return "You haven't selected any Pokémon"
  return (
    <>
      <div className="p-5 heroGif">
        <Container>
          <img
            src={Ash}
            alt="logo"
            className="d-flex justify-content-center align-items-center hero-dimension"
          />
        </Container>
      </div>   
      <Container>
        <h2 className="pt-5 d-flex justify-content-center align-items-center">
          {userData?.savedPokemon?.length
            ? `Viewing ${userData.savedPokemon.length} saved ${


                userData.savedPokemon.length === 1 ? "Pokémon" : "Pokémon"
              }`
            : "You haven't selected any Pokémon :("}

        </h2>
        <Row className="card-gap">
          {userData?.savedPokemon?.map((pokemon) => {
            return (
              <Col key={pokemon.pokeId} md="4">
                <Card border="dark" className="card-color">
                  {pokemon.image ? (
                    <Card.Img
                      src={pokemon.image}
                      alt={`The cover for ${pokemon.name}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title> 
                      <a
                        href={`https://www.google.com/search?q=${encodeURIComponent(
                          pokemon.name
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {pokemon.name}
                      </a>
                        </Card.Title>
                    <Card.Text className="text-shadow">Pokedex #{pokemon.pokedex}</Card.Text>
                    <Card.Text className="text-shadow">{pokemon.description}</Card.Text>
                    <Card.Text className="text-shadow">
                      Rating:{" "}
                      <select
                        className="rating-button rating"
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
                    </Card.Text>
                    <Button
                      className="btn-block btn-info button"
                      onClick={() => handleDeletePokemon(pokemon)}>
                      Delete this Pokémon!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedPokemon;


// import React, { useState } from "react";
// import { Container, Card, Button, Row, Col } from "react-bootstrap";
// import { useQuery, useMutation } from "@apollo/client";
// import { QUERY_ME } from "../utils/queries";
// import { REMOVE_POKEMON } from "../utils/mutations";
// import Auth from "../utils/auth";
// import { removePokemonId } from "../utils/localStorage";

// const SavedPokemon = () => {
//   const { loading, data } = useQuery(QUERY_ME);
//   const [removePokemon] = useMutation(REMOVE_POKEMON);

//   const userData = data?.me || {};

//   // Create a state variable to store user ratings for saved Pokemon
//   const [userRatings, setUserRatings] = useState({});

//   // Function to handle user rating input
//   const handleRatingChange = (pokeId, rating) => {
//     setUserRatings({
//       ...userRatings,
//       [pokeId]: rating,
//     });
//   };

//   // create function that accepts the book's mongo _id value as param and deletes the book from the database
//   const handleDeletePokemon = async (pokemon) => {
//     const token = Auth.loggedIn() ? Auth.getToken() : null;

//     if (!token) {
//       return false;
//     }

//     try {
//       const response = await removePokemon({
//         variables: { pokeId: pokemon.pokeId },
//       });
//       console.log(response);
//       // upon success, remove book's id from localStorage
//       removePokemonId(pokemon.pokeId);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // if data isn't here yet, say so
//   if (loading) {
//     return <h2>LOADING...</h2>;
//   }

//   return (
//     <>
//       <div className="text-light bg-dark p-5">
//         <Container>
//           <h1>Viewing saved Pokemon!</h1>
//         </Container>
//       </div>
//       <Container>
//         <h2 className="pt-5">
//           {userData?.savedPokemon?.length
//             ? `Viewing ${userData.savedPokemon.length} saved ${
//                 userData.savedPokemon.length === 1 ? "book" : "books"
//               }:`
//             : "You have no saved books!"}
//         </h2>
//         <Row>
//           {userData?.savedPokemon?.map((pokemon) => {
//             return (
//               <Col key={pokemon.pokeId} md="4">
//                 <Card border="dark">
//                   {pokemon.image ? (
//                     <Card.Img
//                       src={pokemon.image}
//                       alt={`The cover for ${pokemon.name}`}
//                       variant="top"
//                     />
//                   ) : null}
//                   <Card.Body>
//                     <Card.Title>{pokemon.name}</Card.Title>
//                     <p className="small">Authors: {pokemon.name}</p>
//                     <Card.Text>{pokemon.description}</Card.Text>
                    
//                     {/* Include the Rating Input */}
//                     <select
//                       value={userRatings[pokemon.pokeId] || 0}
//                       onChange={(e) =>
//                         handleRatingChange(pokemon.pokeId, parseInt(e.target.value))
//                       }
//                     >
//                       {Array.from({ length: 6 }, (_, i) => (
//                         <option key={i} value={i}>
//                           {i}
//                         </option>
//                       ))}
//                     </select>
                    
//                     <Button
//                       className="btn-block btn-danger"
//                       onClick={() => handleDeletePokemon(pokemon)}
//                     >
//                       Delete this Book!
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             );
//           })}
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default SavedPokemon;
