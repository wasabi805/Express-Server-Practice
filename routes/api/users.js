//LOGIN && IDENTIFICATION  && AUTHENTICATION stuff will go in here:

const express =require('express');
const router = express.Router();
const gravatar =require('gravatar');
const bcrypt = require('bcryptjs');

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
                return res.status(400).json({email:'user not found'}) //return error code and value for email = 'user not found'
            }
            //next, if user IS found, check their pw : NOTE, remember the pw in db is hashed so, we still need bcrypt for verification
            bcrypt.compare(password, user.password)//compare password(const from ln 65 vs. pw from db=> user.password): .compare evaluates to true or false
                .then(isMatch=>{
                    if(isMatch){
                        res.json({msg: 'Success'})
                    }
                    else{
                        return res.status(400).json({password: 'Password incorrect'})
                    }
                })

        });

});

//export the router
module.exports=router;