const express = require('express');
const mongoose = require('mongoose');
const bodyParser=require('body-parser'); //see './models/User.js' line 30
const passport = require('passport');
const path = require('path');

const users=require('./routes/api/users');
const profile=require('./routes/api/profile');
const posts=require('./routes/api/posts');

const app=express();

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

//Passport (Middleware)
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);



//Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


//Server static assets IF IN PRODUCTION

//run test to see if we are in production

if(process.env.NODE_ENV === 'production'){
    //if true, SET static folder
    app.use(express.static('client/build'));

    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })

}


const port = process.env.PORT || 5000;


app.listen(port, ()=>console.log(`Server running on port ${port}`));


