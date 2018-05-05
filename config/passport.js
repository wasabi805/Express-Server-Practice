//Bring in these const for token verification


const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

// NOTE: this users string comes from arg used in module.exports of the User Schema ('/models.User ln 32)
const User = mongoose.model('users');
const keys = require('../config/keys'); //Bring in the keys, we need for token auth
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;


//                  FIND LOGGED-IN/ AUTHENTICATED user by their ID              //

module.exports = passport=>{
    console.log("I'm from passport.js/ module.exports");

    passport.use(
        new JwtStrategy(opts, (jwt_payload, done)=>{
            // console.log("--------------------------------------",jwt_payload, done)
            User.findById(jwt_payload.id)
                .then(user=>{
                    if(user){
                        return done(null, user) //null = errors
                    }
                    else{
                        return done(null, false) //false = there is no user
                    }

                })
                .catch(err=> console.log(err))
        })
    );


};





