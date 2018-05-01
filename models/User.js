const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema - USER MODEL
const UserSchema = new Schema({
    name:{
        type: String,
        required :true
    },

    email:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true
    },

    avatar:{
        type: String,
    },

    date:{
        type: Date,
        default: Date.now()
    },

});

module.exports = User = mongoose.model('users', UserSchema); //pass in 'users' arg and const UserSchema / db Model