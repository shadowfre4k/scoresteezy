const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    savedPokemon: [PokemonCard]
  }

  type PokemonCard {
    pokeId: String
    name: String
    pokedex: Int
    price: Float
    image: String
    rating: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  input PokemonInput {
    pokeId: String
    name: String
    pokedex: Int
    price: Float
    image: String
    rating: Int
  }

  type Query {
    me: User!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    savePokemon(pokemonData: PokemonInput!): User
    removePokemon(pokeId: String!): User
  }
`;

module.exports = typeDefs;
