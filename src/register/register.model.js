const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
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
    address : {
        type: String,
        required: true
    },
    friends : {
        type: Array,
    },
    
});
const register = mongoose.model('user', userSchema, "register");
module.exports = register;