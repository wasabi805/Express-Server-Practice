//CONTAINS INFO ABOUT THE USERS' POSTS
const express =require('express');
const router = express.Router(); // DEFINE THE ROUTER

const mongoose = require('mongoose');
const passport = require('passport');

//Post model/Schema
const Post = require('../../models/Post');

//Profile model

const Profile = require('../../models/Profile');

//Validation
const validatePostInput = require('../../validation/post');


//@ROUTES   GET api/posts/test
//@desc     TEST the post route
//@access   PUBLIC

router.get('/test', (req,res)=>{
    res.json({msg: "POSTS WORKS!!"})
} );

//@ROUTES   GET api/posts
//@desc     fetches ALL posts
//@access   PUBLIC

router.get('/', (req,res)=>{

    Post.find()
        .sort({ date: -1 })
        .then(posts=>res.json(posts))
        .catch(err=>res.status(404).json({nopostsfound: 'No posts found.'}))
} );


//@ROUTES   GET api/posts/:id
//@desc     fetches A SINGLE posts
//@access   PUBLIC

router.get('/:id', (req,res)=>{

    Post.findById(req.params.id)
        .sort({ date: -1 })
        .then(post=>res.json(post))
        .catch(err=>res.status(404).json({nopostfound: 'No post found with that id.'}))
} );


//Create a route that handles posts

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


//@ROUTES   DELETE api/posts/:id
//@desc     delete a single post
//@access   Private

router.delete('/:id', passport.authenticate('jwt', {session: false}),
    (req,res)=>{

        Profile.findOne({user: req.user.id}).then(profile=>{
            Post.findById(req.params.id).then(post=>{
                //check for the post owner
                //the if stmnt checks against req.user.id
                //keep in mind, post.user !=String vs. req.user.id == String
                if(post.user.toString() !== req.user.id){
                    return  res.status(401).json({notauthorized: 'User not authorized'})
                }

                //..if it is the author of the post...

                post.remove().then(()=>res.json({success: true}))
                    .catch(err=>res.status(404).json({postnotfound: 'Post not found.'}))

            })
        })
    });





module.exports=router;