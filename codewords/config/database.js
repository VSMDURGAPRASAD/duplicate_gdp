
const mongoose = require('mongoose');
const express = require("express");
const http = require('http');



const LOG = require('../utils/logger')


//var app = express();
LOG.debug('Inside database.js')


// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/GDP-4'

// mongoose.connect('mongodb://localhost/GDP-4',{
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => {
//     console.log('MongoDB Connected');
// }, err => {
//     console.log(err);
// });


 

mongoose.connect('mongodb+srv://prasad:prasad@cluster0-a4krm.mongodb.net/test?retryWrites=true&w=majority')
.then(() => {
    console.log('DB Connected');
}, err => {
    console.log(err);
});

 
// const smp = new sample({
//     User_name: 'krishna',
//     User_number: '3'
// })
// smp.save(function(error){
//     if(error)
//     return console.log('saving data error',error)
// })



// const cdw = new codeword({
//     codeWordSetName : 'Medium',
//     codeword : 'SCALES'    
// })

// cdw.save(function(error){
//     if(error)
//     return console.log('saving codeword data error',error)
// })

// codeword.collection.insertMany(codewordsjson,function(err){
//     if(err){
//         return console.log("error in adding codeword json", err);
//     }
// })

// Codewordset.collection.insertMany(codewordsetjson,function(err){
//     if(err){
//         return console.log("error in adding codewordset json", err);
//     }
// })

// Course.collection.insertMany(coursejson,function(err){
//     if(err){
//         return console.log("error in adding course json", err);
//     }
// })

// Courseuser.collection.insertMany(courseuserjson,function(err){
//     if(err){
//         return console.log("error in adding course user json", err);
//     }
// })

// sample.collection.insertMany(sampleJson,function(err){
//     if(err){
//         return console.log("error in adding sample json", err);
//     }
// })


LOG.debug('End of mongoDB')
