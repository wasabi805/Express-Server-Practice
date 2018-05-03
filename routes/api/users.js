//LOGIN && IDENTIFICATION  && AUTHENTICATION stuff will go in here:

const express =require('express');
const router = express.Router();
const gravatar =require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//Load the User Model
const User = require('../../models/User');

//LOAD Input Validation : brings in the register.js file

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');       // <== import /validation/login.js

//@ROUTES   GET api/users/register
//@desc     Registers a user
//@access   PUBLIC

router.post('/register', (req,res)=>{
    //req.body is everything(name, email, pw) that is sent to this route
    const{errors, isValid} = validateRegisterInput(req.body); // func(data) imported from /validation/register.js :

    //Check Validation
    if(!isValid){
        return res.status(400).json(errors); //returns the errors obj inside validateRegisterInput(data) from /validation/register.js
    }

    User.findOne({email: req.body.email})
        .then(user=>{
            if(user){
                return res.status(400).json({email: 'Email already exists'})
            }
            else{

                const avatar = gravatar.url(req.body.email, {s:'200', r: 'pg', d: 'mm'});

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password

                });

                bcrypt.genSalt(10, (err, salt)=>{
                    bcrypt.hash(newUser.password, salt, (err, hash)=>{
                        if(err){
                            console.log('There was an error->(users.js ln49)');
                            throw err;
                        }
                        else{
                            newUser.password= hash;
                            newUser
                                .save()
                                .then(user=>res.json(user))
                                .catch(err=> console.log(err));
                        }
                    })
                })
            }
        })
});

//@ROUTES   POST api/users/login
//@desc     LOGIN User / return JSON Web Token
//@access   PUBLIC

router.post('/login', (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;


    const{errors, isValid} = validateLoginInput(req.body);                  // <== import errors{} and isValid

    console.log(email, 'from /login, users.js');
    console.log(isValid, 'isValid from /login users.js');
    //Check Validation
    if(!isValid){                                                           // <== return errors{} if errors
        return res.status(400).json(errors);
    }

    //NOW, find the user by email

    User.findOne({email : email})//value is from const email = req.body.email

        .then(user=>{
            //check for user

            if(!user){

                console.log(user, ': user')
                // return res.status(400).json({email:'user not found'})
                errors.email = 'User not found.';                           // <== add msg to errors{}
                return res.status(404).json(errors)                         // <== return that error{}
            }

            //check Password
            bcrypt.compare(password, user.password).then(isMatch=>{

                    if(isMatch){
                        //User Match

                        const payload={
                            id: user.id, name: user.name, avatar: user.avatar
                        };
                        //Sign in Token
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 7200 },
                            (err, token)=>{
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                            }
                        );
                    }

                    else{
                        errors.password = 'Password incorrect.';            //<== add msg to errors{}
                        return res.status(400).json(errors)                 //<=== return errors{}
                    }
                });
        });

});

//@ROUTES   GET api/users/current
//@desc     Return the current/ logged in user
//@access   PRIVATE

//1st arg = name of route
//2nd arg = authentication method which takes args 'jwt == ln 7 of this file && no session used
//3rd arg = cb of res && req

router.get('/current', passport.authenticate('jwt', {session:false}),
    (req,res)=>{
    // res.json({msg: 'success from users.js, ln 121'});
    //     res.json(req.user) //remember that user is already in the req arg : see config/passport.js ==> .then(user)

        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        })
    }
);

//export the router
module.exports=router;