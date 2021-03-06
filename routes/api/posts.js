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


//@ROUTES   POST api/posts/like/:id
//@desc     Make a like on another users' post
//@access   Private

router.post('/like/:id', passport.authenticate('jwt', {session: false}),
    (req,res)=>{

        Profile.findOne({user: req.user.id}).then(profile=>{
            Post.findById(req.params.id).then(post=>{

                //check to see if logged in user previously made a like to the post

                //if the user's id is already inside the likes array from the Post model
                if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0 ){
                    return  res.status(400).json({alreadyliked: 'User already liked this post'})
                }

                //else.. put the user id in the likes array
                post.likes.unshift({user: req.user.id});

                post.save().then(post=>res.json(post));

            })
        })
    });

//@ROUTES   POST api/posts/unlike/:id
//@desc     Make a UNLIKE on another users' post
//@access   Private

router.post('/unlike/:id', passport.authenticate('jwt', {session: false}),
    (req,res)=>{

        Profile.findOne({user: req.user.id}).then(profile=>{
            Post.findById(req.params.id).then(post=>{

                //check to see if logged in user previously made a like to the post

                //if post.likes ===0 , the user hasn't made a like yet
                if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0 ){
                    return  res.status(400).json({notliked: 'You have not made a like for this post.'})
                }

                // GET the remove index of user
                const removeIndex = post.likes
                   .map(item=> item.user.toString).indexOf(req.user.id);

                //Splice that user out of the likes array
                post.likes.splice(removeIndex,1);

                //once removed, SAVE the change
                post.save().then(post=> res.json(post))



            }).catch(err => res.json({likenotfound: 'No likes found(from catch).'}))
        });
    });

//@ROUTES   POST api/posts/comment/:id  ==> NOTE: the id belongs to the post so we know which post will receive the comment
//@desc     Add a COMMENT on another users' post
//@access   Private


router.post('/comment/:id', passport.authenticate('jwt', {session: false}),
    (req,res)=>{

        const {errors, isValid} = validatePostInput(req.body);

        if(!isValid){
            return res.status(400).json(errors);
        }

        Post.findById(req.params.id)
        //after we get back the post id, create a new comment(see below)
            .then(post=>{

                const newComment ={
                    text: req.body.text,
                    name: req.body.name,
                    avatar: req.body.avatar,
                    user: req.user.id
                };

                //Add newComment to the comments array

                post.comments.unshift(newComment);

                post.save().then(post=> res.json(post))

            })
            .catch(err=>res.status(404).json({postnotfound: 'No post found.(from catch)'}))

    });

//@ROUTES   DELETE api/posts/comment/:id/:comment_id  ==> NOTE: the :id belongs to the post, :comment_id belongs to which comment of that post id
//@desc     REMOVE a specific COMMENT on another users' specific post
//@access   Private


router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {session: false}),
    (req,res)=>{

        Post.findById(req.params.id)
        //after we get back the post id, create a new comment(see below)
            .then(post=>{

               //Check to see if the comment exists:
                // - comment/:id/:comment_id  === req.params.comment_id
                // if this is true, then the comment doesn't exist in the comments array
                if(post.comments.filter(comment=>comment._id.toString() === req.params.comment_id).length===0){
                    return res.status(404).json({commentnotexist: 'Comment does not exist.'});
                }

                //if the comment does exist.. map the comments array to remove the comment.

                //Get remove index
                const removeIndex = post.comments.map(item=>item._id.toString()).indexOf(req.params.comment_id);

                //Splice out of the array
                post.comments.splice(removeIndex,1);

                //Save the post
                post.save().then(post=>res.json(post));

            })
            .catch(err=>res.status(404).json({postnotfound: 'No post found.(from catch)'}))

    });

module.exports=router;