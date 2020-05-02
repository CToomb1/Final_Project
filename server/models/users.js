const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');

const locationSchema = require("./Location");

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            validate: [({ length }) => length >= 8, "Password should be longer."],
            required: true
        },

        savedLocations: [locationSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.virtual('locationCount').get(function () {
    return this.savedLocations.length;
});


const User = model("User", UserSchema);

module.exports = User;