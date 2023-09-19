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

  // create function that accepts the Pokemon's mongo _id value as param and deletes the pokemon from the database
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
      // upon success, remove Pokemon"s id from localStorage
      removePokemonId(pokemon.pokeId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className="p-5">
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
                userData.savedPokemon.length === 1 ? "Pokemon" : "Pokemons"
              }:`
            : "You haven't selected any Pokemon :("}
        </h2>
        <Row>
          {userData?.savedPokemon?.map((pokemon) => {
            return (
              <Col key={pokemon.pokeId} md="4">
                <Card border="dark">
                  {pokemon.image ? (
                    <Card.Img
                      src={pokemon.image}
                      alt={`The cover for ${pokemon.name}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{pokemon.name}</Card.Title>
                    <p className="small">Authors: {pokemon.name}</p>
                    <Card.Text>{pokemon.description}</Card.Text>
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeletePokemon(pokemon)}
                    >
                      Delete this Pokemon!
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
