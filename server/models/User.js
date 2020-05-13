const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');

const recipeSchema = require("./recipes");

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            // validate: [({ length }) => length >= 7, "Password should be longer."],
            required: true
        },

        savedRecipes: [recipeSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

UserSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

UserSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.virtual('recipeCount').get(function () {
    return this.savedRecipes.length;
});


const User = model("User", UserSchema);

module.exports = User;