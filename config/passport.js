//Bring in these const for token verification


const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

// NOTE: this users string comes from arg used in module.exports of the User Schema ('/models.User ln 32)
const User = mongoose.model('users');
const keys = require('../config/keys'); //Bring in the keys, we need for token auth

//create an empty object for options
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;


//
// (regarding ln 28 of this file) remember in server.js, we passed in 'passport' (from ln 33 in server.js)
//jwt_payload should/will include the user data that was included from the 'payload' from /routes/api/users.js in ln 37-43


//                  FIND LOGGED-IN/ AUTHENTICATED user by their ID              //
//  NOTE: The process of finding the user in mongoDB only after auth token has been issued.
module.exports = passport=>{
    console.log("I'm from passport.js/ module.exports");

    passport.use(
        new JwtStrategy(opts, (jwt_payload, done)=>{
            // console.log(jwt_payload)
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

    //next check localhost:5000/api/users/current
    // if success, the function i wrote in server.js from ln 121 will appear on postman// see below

    // router.get('/current', passport.authenticate('jwt', {session:false}),
    //     (req,res)=>{
    //         res.json({msg: 'success from users.js, ln 121'});
    //     }
    // );
};





