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


router.get('/', passport.authenticate('jwt', {session: false}, (req, res)=>{

            const errors={};
            console.log('hello from profile');
            console.log("REQ - ", req);
            console.log("RES - ", res);
            console.log("User_id: ", res._id);
            // console.log("REQ-Param", req.query.id);

            // res.json({status: "success"});



            // Profile.findOne({user: res._id}).then(profile =>{
            //     console.log("in the response", profile)
            //     if(!profile){
            //         errors.noprofile ="There is no profile for this user";
            //         return  res.status(404).json(errors)
            //     }
            //     res.json(profile);
            // }).catch(err=> res.status(404).json(err))
}));


module.exports=router;



// router.get(
//     '/', passport.authenticate(
//         'jwt', {session: false},                    //<=== 1st arg needed for authentication
//         (req, res)=>{
//
//             const errors={};                        //<=== initialize the errors object
//
//
//             Profile.findOne({user: req.user.id})    //<=== remember: after authentication, logged in user's data should be inside the user arg from the login route in users.js
//                 .then(profile =>{
//                     //If the user profile doesn't exist
//                     if(!profile){
//                         errors.noprofile =          //<=== define the error
//                             "There is no profile for this user";
//                         return  res.status(404).json(errors);//<=== pass in the error var
//                     }
//                     //if the profile DOES exist, pass back the logged in user's profile.
//                     res.json(profile);
//                 })
//                 //if something goes wrong while trying to retrieve the logged in user's profile.
//                 .catch(err=> res.status(404).json(err))
//
//         }));
//
//
// module.exports=router;