import { useQuery, useMutation } from "@apollo/client";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { QUERY_ME } from "../utils/queries";
import { REMOVE_POKEMON } from "../utils/mutations";
import Auth from "../utils/auth";
import { removePokemonId } from "../utils/localStorage";

const SavedPokemon = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removePokemon] = useMutation(REMOVE_POKEMON);

  const userData = data?.me || {};

  // create function that accepts the book"s mongo _id value as param and deletes the book from the database
  const handleDeletePokemon = async (pokeId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await removePokemon({
        variables: { pokeId },
      });
      console.log(response);
      // upon success, remove book"s id from localStorage
      removePokemonId(pokeId);
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
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved Pokemon!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData?.savedPokemon?.length
            ? `Viewing ${userData.savedPokemon.length} saved ${
                userData.savedPokemon.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
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
                      onClick={() => handleDeletePokemon(pokemon.pokemonId)}
                    >
                      Delete this Book!
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
