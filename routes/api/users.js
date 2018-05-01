//LOGIN && IDENTIFICATION  && AUTHENTICATION stuff will go in here:

const express =require('express');
const router = express.Router();
const gravatar =require('gravatar');
const bcrypt = require('bcryptjs');

//Load the User Model
const User = require('../../models/User');


//@ROUTES GET api/users/test
//@desc test user
//@access PUBLIC

router.get('/test', (req,res)=>{
    res.json({msg: "Users WORKS!!"}) //.json() puts our res from cb into JSON format
} );


//@ROUTES GET api/users/register
//@desc Registers a user
//@access PUBLIC


router.post('/register', (req,res)=>{
    //first, will use mongoose to see if the email exists: User from model we imported at line 7 from this file
    //second, in order to use 'body', need to bring it into this file: already installed body-parser which is where it comes from
    //third, make sure that const bodyParser=require('body-parser'); is inside server.js (line 3 && lines 13-14)
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

//export the router
module.exports=router;