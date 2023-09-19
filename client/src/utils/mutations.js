import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_POKEMON = gql`
  mutation savePokemon($pokemonData: PokemonInput!) {
    savePokemon(pokemonData: $pokemonData) {
      _id
      username
      email
      savedPokemon {
        pokeId
        name
        pokedex
        image
        price
        rating
      }
    }
  }
`;

export const REMOVE_POKEMON = gql`
  mutation removePokemon($pokeId: String!) {
    removePokemon(pokeId: $pokeId) {
      _id
      username
      email
      savedPokemon {
        pokeId
        name
        pokedex
        image
        price
      }
    }
  }
`;
