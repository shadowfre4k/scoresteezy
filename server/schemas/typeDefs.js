const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    savedPokemon: [pokeSchema]
  }

  type PokemonCard {
    pokeId: ID!
    name: [String]
    pokedex: Int
    price: Float
    image: String
    comment: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input PokemonInput {
    name: [String]
    pokedex: Int
    price: Float
    image: String
    comment: String
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    savePokemon(pokemonData: PokemonInput!): User
    removePokemon(pokeId: ID!): User
  }
`;

module.exports = typeDefs;
