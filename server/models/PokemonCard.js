const mongoose = require("mongoose");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
// Name, price, comments, rating
const pokeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  pokedex: {
    type: Number,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
});

const PokemonCard = mongoose.model("PokemonCard", pokeSchema);

module.exports = PokemonCard;
