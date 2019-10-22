const mongoose = require('mongoose');

const codewordSchema = new mongoose.Schema({
    codeWordSetName: {
        type: String,
        require: true,
        minlength: 5
    },
    codewords: {
        type: [String],
        require: true,
        minlength: 5
    } 
    
});
module.exports= mongoose.model('codeword',codewordSchema)