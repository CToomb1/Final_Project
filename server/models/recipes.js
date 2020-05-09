const { Schema } = require('mongoose');

const recipeSchema = new Schema({
    recipe: {
        recipeID: {
            type: String,
            required: true,
        },
        title: {
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
            required: true,
        },
        image: {
            type: String,
        },


    }
});

module.exports = recipeSchema;