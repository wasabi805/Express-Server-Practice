//CONTAINS INFO ABOUT THE USERS
const express =require('express');
const router = express.Router(); // DEFINE THE ROUTER
const mongoose = require('mongoose');               //<=== bring it in
const passport = require('passport');               //<=== bring in so we can create protected routes

//Load Profile Model
const Profile = require('../../models/Profile');    //<=== bring in the Profile Schema

//Load user profile
const User = require('../../models/User');          //<=== bring in the User Schema

//Load Validation
const validateProfileInput= require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');


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

            // populates the profile from user key inside the Profile.js Schema.
            Profile.findOne({user: req.user.id})
                // .populate('user',['name','avatar'])
                .populate('user', ['name','avatar'])
                .then(profile =>{

                if(!profile){
                    errors.noprofile ="There is no profile for this user";
                    return  res.status(404).json(errors)
                }
                res.json(profile);
            }).catch(err=> res.status(404).json(err))
        }
);

//@ROUTES GET api/profile/all
//@desc  Get ALL user profiles
//@access Public

router.get('/all', (req, res)=>{

    const errors = {};

    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles=>{
            if(!profiles){
                errors.noprofile = 'There are no profile for this user.';
                return res.status(404).json(errors);
            }
            res.json(profiles);
        })
        .catch(
            err=> res.status(400).json({profile: "There are no profile for this user. (From Catch)"}));
});



//@ROUTES GET api/profile/handle/:handle
//@desc  Get profile by handle
//@access Public ==> because anyone should be able to see a profile
//Note: Can always change this to private if you want only logged-in users to have access to profiles

router.get('/handle/:handle', (req,res)=>{

    const errors={};

    Profile.findOne({handle: req.params.handle})
        .populate('user',['name', 'avatar'])
        .then(profile=>{
            if(!profile){
                errors.noprofile='There is no profile for this user.';
                res.status(404).json(errors)
            }

            res.json(profile);

        }).catch(err=>res.status(404).json(err))
});


//@ROUTES GET api/profile/user/:user_id
//@desc  Get profile by user ID
//@access Public

router.get('/user/:user_id', (req,res)=>{

    const errors={};

    Profile.findOne({user: req.params.user_id})
        .populate('user',['name', 'avatar'])
        .then(profile=>{
            if(!profile){
                errors.noprofile='There is no profile for this user.';
                res.status(404).json(errors)
            }

            res.json(profile);

        }).catch(err=>res.status(404).json({profile: "There is no profile for this user.(From Catch)"}))
});

//@ROUTES POST api/profile
//@desc  CREATE or EDIT user profile
//@access Private

router.post('/', passport.authenticate('jwt', {session: false}),
    (req, res)=> {

        //For Validation errors
        const {errors, isValid} = validateProfileInput(req.body);

        //Check the validations
        if(!isValid){
            //Return any errors with 400 status
            return res.status(400).json(errors);
        }


        //GET FIELDS - NOTE: The fields we'll post are in req.body
        const profileFields={};
        console.log('frm models/Profile.js ln 148');

        profileFields.user = req.user.id;

        //check to see if the handle was sent in from the form : if so set it to req.body.handle
        if(req.body.handle) profileFields.handle = req.body.handle;
        if(req.body.company) profileFields.company = req.body.company;
        if(req.body.website) profileFields.website = req.body.website;
        if(req.body.location) profileFields.location = req.body.location;
        if(req.body.bio) profileFields.bio = req.body.bio;
        if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;

        //Status:
        if(req.body.status) profileFields.status= req.body.status;

        //SKIlls : Remember that this is an array
        if(typeof req.body.skills !== 'undefined'){
            profileFields.skills= req.body.skills.split(",")
        }
        //SOCIAL : social is inside its own objects
        //so.. initialize profileFields.social as an empty obj
        profileFields.social={};

        if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
        if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
        if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
        if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
        if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

        //FIND THE USER
        console.log('looking for user', req.user.id);
        Profile.findOne({user: req.user.id})

            .then(profile=>{

                if(profile){
                    //if the profile exists, i'd want to UPDATE it, NOT create a new one.
                    Profile.findOneAndUpdate(
                        {user: req.user.id},
                        {$set: profileFields},
                        {new: true}
                        )
                        .then(profile=> res.json(profile));
                }
                else{
                    //Create
                    //Check if the handle exists to prevent creating multiple db entries of the same user.

                    Profile.findOne({handle: profileFields.handle}).then(profile=>{
                            if(profile){
                                errors.handle='This handle already exists';
                                res.status(400).json(errors);
                            }
                            console.log('saving new profile');

                            //Save Profile
                            new Profile(profileFields).save().then(profile=> res.json(profile));
                        });
                }
            });
    }
);

//@ROUTES POST api/profile/experience
//@desc  Adds experience to profile for logged in user
//@access Private


router.post('/experience', passport.authenticate("jwt", {session: false}), (req,res)=>{

    const {errors, isValid} = validateExperienceInput(req.body);
    console.log(req.body);
    //Check the validations
    if(!isValid){
        //Return any errors with 400 status
        return res.status(400).json(errors);
    }

   Profile.findOne({user: req.user.id})
       .then(profile=>{
           const newExp={
               title : req.body.title,
               company: req.body.company,
               location: req.body.location,
               from: req.body.from,
               to: req.body.to,
               current: req.body.current,
               description: req.body.description
           };

           //Add to experience array
           // profile.experience=[]; //cleans out experience array

           profile.experience.unshift(newExp); //add to beginning of the array


           profile.save().then(profile=>res.json(profile)) //adds the experience and return the profile

       })
});


//@ROUTES POST api/profile/education
//@desc  Adds experience to profile for logged in user
//@access Private


router.post('/education', passport.authenticate("jwt", {session: false}), (req,res)=>{
    console.log(req.body, '<====================req.body from /education');
    const {errors, isValid} = validateEducationInput(req.body);

    //Check the validations
    if(!isValid){
        //Return any errors with 400 status
        return res.status(400).json(errors);
    }

    Profile.findOne({user: req.user.id})
        .then(profile=>{
            const newEdu={
                school : req.body.school,
                degree: req.body.degree,
                fieldofstudy: req.body.fieldofstudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            };

            //Add to experience array
            // profile.experience=[]; //cleans out experience array

            profile.education.unshift(newEdu); //add to beginning of the array


            profile.save().then(profile=>res.json(profile)) //adds the experience and return the profile

        })
});


//@ROUTES DELETE api/profile/experience/:exp_id
//@desc  deletes experience to profile for logged in user
//@access Private


router.delete('/experience/:exp_id', passport.authenticate("jwt", {session: false}), (req,res)=>{
    //Note: don't need to validate the delete route.

    Profile.findOne({user: req.user.id})

        .then(profile=>{
            //GET remove index with map()
            const removeIndex = profile.experience.map(item=>item.id).indexOf(req.params.exp_id);

            //Splice: once we het the id, we want to return the experience
            profile.experience.splice(removeIndex,1);

            profile.save().then(profile=>res.json(profile));
        })

        .catch(err=>res.status(404).json(err))
});


//@ROUTES DELETE api/profile/education/:edu_id
//@desc  deletes education to profile for logged in user
//@access Private


router.delete('/education/:edu_id', passport.authenticate("jwt", {session: false}), (req,res)=>{
    //Note: don't need to validate the delete route.

    Profile.findOne({user: req.user.id})

        .then(profile=>{
            //GET remove index with map()
            const removeIndex = profile.education.map(item=>item.id).indexOf(req.params.edu_id);

            //Splice: once we het the id, we want to return the experience
            profile.education.splice(removeIndex,1);

            profile.save().then(profile=>res.json(profile));
        })

        .catch(err=>res.status(404).json(err))
});

//@ROUTES DELETE api/profile
//@desc  deletes user profile and user account
//@access Private


router.delete('/', passport.authenticate("jwt", {session: false}), (req,res)=>{

    //findOneAndRemove() is a mongoose method
    Profile.findOneAndRemove({user: req.user.id})
        .then(()=>{
            //_id since we are looking for the id IN THE USER MODEL
            User.findOneAndRemove({_id: req.user.id})
                .then(()=>res.json({success: true}))
        })
});



module.exports=router;


