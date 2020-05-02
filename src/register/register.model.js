const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    skill : {
        type: String,
        required: true,
        lowercase: true
    },
    tags : {
        type: Array,
    },
});

const register = mongoose.model('user', userSchema, "register");
module.exports = register;