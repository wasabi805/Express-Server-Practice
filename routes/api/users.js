//LOGIN && IDENTIFICATION  && AUTHENTICATION stuff will go in here:

const express =require('express');
const router = express.Router();
const gravatar =require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

//Load the User Model
const User = require('../../models/User');


//@ROUTES   GET api/users/test
//@desc     test user
//@access   PUBLIC

router.get('/test', (req,res)=>{
    res.json({msg: "Users WORKS!!"}) //.json() puts our res from cb into JSON format
} );


//@ROUTES   GET api/users/register
//@desc     Registers a user
//@access   PUBLIC


router.post('/register', (req,res)=>{

    User.findOne({email: req.body.email})
        .then(user=>{
            if(user){
                return res.status(400).json({email: 'Email already exists'})
            }
            else{
                // see : https://github.com/emerleite/node-gravatar  ==> Usage
                const avatar = gravatar.url(req.body.email, {s:'200', r: 'pg', d: 'mm'});  //s=size, r=rating, d=default : mm= blank avatar

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password

                });

                bcrypt.genSalt(10, (err, salt)=>{
                    bcrypt.hash(newUser.password, salt, (err, hash)=>{
                        if(err) throw err;
                        newUser.password= hash;
                        newUser
                            .save()
                            .then(user=>res.json(user))
                            .catch(err=> console.log(err));
                    })
                })
            }
        })
});

//@ROUTES   GET api/users/login
//@desc     LOGIN User / return JSON Web Token
//@access   PUBLIC

router.post('/login', (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    //NOW, find the user by email

    User.findOne({email: email})//value is from const email = req.body.email
        .then(user=>{
            //check for user
            if(!user){
                return res.status(400).json({email:'user not found'})
            }

            bcrypt.compare(password, user.password)//compare password(const from ln 65 vs. pw from db=> user.password): .compare evaluates to true or false
                .then(isMatch=>{
                    if(isMatch){
                        // res.json({msg: 'Success'});

                        //create the payload to pass into jwt.sign()
                        const payload={
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        };

                        //Sign Token / create the token
                        // 1st arg is from above,
                        // 2nd arg is the key ==> key placed in './config/keys.js', see ln 8 of this file.
                        // 3rd arg is the time key expires
                        // 4th arg is cb
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {expiresIn: 3600},//3600 = 1 hour
                            (err, token)=>{
                                res.json({
                                    success: true,
                                    token: 'Bearer' + token //Bearer is a type of token with it's own protocol
                                    //NOTE: on success, token will go into the header as auth.(Will cover later)
                                });
                        });
                    }
                    else{
                        return res.status(400).json({password: 'Password incorrect'})
                    }
                })

        });

});

//export the router
module.exports=router;