const express = require('express');

const app=express();

app.get('/', (req,res)=> res.send('Hello'));

const port = process.env.port || 5000; // Note: process.env.port used for Hiroku deploy. later on

app.listen(port, ()=>console.log(`Server running on ${port}`));