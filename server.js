const express = require('express');
const mongoose = require('mongoose');

const app=express();

//DB Config
const db = require('./config/keys').mongoURI; // .mongoURI is key from ./config/keys


//Connect to MongoDB

// mongoose.connect(db).then(()=>console.log('mongoDb Connected')).catch(err=>console.log(err));
// below me is the line above me split to read easier...

mongoose
    .connect(db)//connect mongoose to our database
    .then(()=>console.log('mongoDb Connected'))//if connection is SUCCESS
    .catch(err=>console.log(err));// return error if connect fails


app.get('/', (req,res)=> res.send('Hello !!!'));

const port = process.env.port || 5000; // Note: process.env.port used for Hiroku deploy. later on

app.listen(port, ()=>console.log(`Server running on ${port}`));