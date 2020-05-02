const { Schema } = require('mongoose');

const locationSchema = new Schema({
    location: {
        type: Number,
        validate: [({ length }) => length === 5, "Zip code should be 5 digits."],
    }
});

module.exports = locationSchema;