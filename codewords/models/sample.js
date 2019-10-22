const mongoose = require('mongoose')
const validator = require('validator')
const SampleSchema = new mongoose.Schema({
    
    User_name:{
        type: String,
        required: true,
        },

    User_number:{
        type: String,
        required: true,
        }
    })
    module.exports = mongoose.model('Sample',SampleSchema)