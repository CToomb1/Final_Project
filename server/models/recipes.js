const { Schema } = require('mongoose');

const recipeSchema = new Schema({
    recipe: {
        recipeID: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        PrepTime: {
            type: String,
            required: true,
        },
        Servings: {
            type: String,
            required: true,
        },
        sourceUrl: {
            type: String,

        },
        FoodPic: {
            type: String,
        },


    }
});

module.exports = recipeSchema;