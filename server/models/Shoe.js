const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
// Name, price, comments, rating
const shoeSchema = new Schema({
  name: [
    {
      type: String,
      required: true,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  // saved book id from GoogleBooks
  price: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
  },
  rating: {
    type: Number,
  },
});

module.exports = shoeSchema;
