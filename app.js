require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const mongoPractisce = require('./mongoo')
const mongoose = require('mongoose')
const { Error } = require('mongoose');

const userRoutes = require('./routes/userRoutes')

const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(bodyParser.json());


app.use('/api/v1',userRoutes);

// app.get('/products');

app.use((req,res,next)=>{
    const error = new Error('Could not find the url');
    error.code= 404
    throw error
})

app.use((error,req,res,next)=>{
    if(res.headerSent){
        return next(error)
    }
    res.status(500||error.code).json({message:error.message||'An unknown error occurred'})
})


// const url = "mongodb+srv://sarsaxena1609:mBaYjmJYAhj231Vk@e-commerce.4qpoi.mongodb.net/";
mongoose
.connect(MONGO_URI)
.then(()=>{app.listen(PORT); console.log('connected')})
.catch((e)=>{console.log(e)})
