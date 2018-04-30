//LOGIN && IDENTIFICATION  && AUTHENTICATION stuff will go in here:

const express =require('express');
const router = express.Router(); // DEFINE THE ROUTER


//CREATE A ROUTE //
//  NOTE: you don't have to type in "localhost:5000/api/users/test:
//  already handled that in server.js => app.use('api/users', users);


//@ROUTES GET api/users/test
//@desc TEST the users route
//@access PUBLIC

router.get('/test', (req,res)=>{
    res.json({msg: "Users WORKS!!"}) //.json() puts our res from cb into JSON format
} );


//export the router
module.exports=router;