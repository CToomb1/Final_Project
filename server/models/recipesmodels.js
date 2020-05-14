const { Schema } = require('mongoose');

const recipeSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  readyInMinutes: {
    type: String,
    required: true,
  },
  servings: {
    type: String,
    required: true,
  },
  sourceUrl: {
    type: String,
  },
  image: {
    type: String,
  },
});

module.exports = recipeSchema;
