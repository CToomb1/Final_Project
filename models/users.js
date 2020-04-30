const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
    {
        user: {
            type: String,
            required: "Enter a username.",
            unique: true
        },
        password: {
            type: String,
            validate: [({ length }) => length >= 8, "Password should be longer."],
            rewuired: "Enter password."
        },
        zipCode: {
            type: Number,
            validate: [({ length }) => length === 5, "Zip code should be 5 digits."],
            required: "Enter zip code."
        }
    }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;