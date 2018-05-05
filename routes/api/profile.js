//CONTAINS INFO ABOUT THE USERS
const express =require('express');
const router = express.Router(); // DEFINE THE ROUTER
const mongoose = require('mongoose');               //<=== bring it in
const passport = require('passport');               //<=== bring in so we can create protected routes

//Load Profile Model
const Profile = require('../../models/Profile');    //<=== bring in the Profile Schema

//Load user profile
const User = require('../../models/User');          //<=== bring in the User Schema



//@ROUTES GET api/profile/test
//@desc TEST the PROFILE route
//@access Public

router.get('/test', (req,res)=>{
    // console.log("REQ: ", req, "RES: ", res)
    res.json({msg: "PROFILE WORKS!!"})
} );

//@ROUTES GET api/profile
//@desc  get current user's profile
//@access Private

router.get('/', passport.authenticate('jwt', {session: false}),
    (req, res)=> {

            const errors={};
            // console.log('hello from profile');
            // console.log("REQ.user - ", req.user);
            // res.json({status: "success"});

            Profile.findOne({user: req.user.id}).then(profile =>{
                console.log("from the response '/' profile.js,", profile);

                if(!profile){
                    errors.noprofile ="There is no profile for this user";
                    return  res.status(404).json(errors)
                }
                res.json(profile);
            }).catch(err=> res.status(404).json(err))
        }
);

module.exports=router;


