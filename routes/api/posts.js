//CONTAINS INFO ABOUT THE USERS' POSTS
const express =require('express');
const router = express.Router(); // DEFINE THE ROUTER

//@ROUTES GET api/posts/test
//@desc TEST the post route
//@access PUBLIC

router.get('/test', (req,res)=>{
    res.json({msg: "POSTS WORKS!!"})
} );

module.exports=router;