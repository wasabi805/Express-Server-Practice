//CONTAINS INFO ABOUT THE USERS' POSTS
const express =require('express');
const router = express.Router(); // DEFINE THE ROUTER

const mongoose = require('mongoose');
const passport = require('passport');

//Post model/Schema
const Post = require('../../models/Post');

//Validation
const validatePostInput = require('../../validation/post');


//@ROUTES   GET api/posts/test
//@desc     TEST the post route
//@access   PUBLIC

router.get('/test', (req,res)=>{
    res.json({msg: "POSTS WORKS!!"})
} );


//create a route that handles posts

//@ROUTES   POST api/posts
//@desc     create post
//@access   Private

router.post('/', passport.authenticate('jwt', {session: false}), (req,res)=>{

    const {errors, isValid} = validatePostInput(req.body);

    if(!isValid){
        //if any errors, send 400 with errors obj
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,  //NOTE: later in React, we'll return an avatar from the name within State.
        user: req.user.id
    });

    newPost.save().then(post=>res.json(post));

} );




module.exports=router;