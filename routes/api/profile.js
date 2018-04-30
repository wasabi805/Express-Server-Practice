//CONTAINS INFO ABOUT THE USERS
const express =require('express');
const router = express.Router(); // DEFINE THE ROUTER

//@ROUTES GET api/profile/test
//@desc TEST the PROFILE route
//@access Public

router.get('/test', (req,res)=>{
    res.json({msg: "PROFILE WORKS!!"})
} );

module.exports=router;