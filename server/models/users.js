const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
        },
        lastName:{
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
            unique: false
        },
        skills: {
            type: Array,
        },
        organization: {
            type: String
        },
        postion: {
            type: String
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String
        },
    },
    { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

module.exports =  { UserModel }