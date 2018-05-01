const express = require('express');
const mongoose = require('mongoose');
const bodyParser=require('body-parser'); //see './models/User.js' line 30

const app=express();

const users=require('./routes/api/users');
const profile=require('./routes/api/profile');
const posts=require('./routes/api/posts');


//Body parser middleware
app.use(bodyParser.urlencoded({extended: false})); //see './models/User.js' line 29
app.use(bodyParser.json()); //see './models/User.js' line 29



//DB Config
const db = require('./config/keys').mongoURI;


//Connect to MongoDB

mongoose
    .connect(db)
    .then(()=>console.log('mongoDb Connected'))
    .catch(err=>console.log(err));


app.get('/', (req,res)=> res.send('Hello !!!'));


//Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


const port = process.env.port || 5000;

app.listen(port, ()=>console.log(`Server running on port ${port}`));