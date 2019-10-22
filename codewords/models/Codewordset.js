const mongoose = require('mongoose');
// Schema = mongoose.Schema;

var codeWordSetSchema = new mongoose.Schema({
        CodeWordSetName: {
            type: String,
            require: true,
            minlength: 5,
            //unique:true
        },
        CodeWordCreator: {
                type: String,
                required: true
        },
        isPermanent : {
                type: Boolean,
                default : false
        },
        Codewords: {
                type: Array,
                required: true
        }
});

module.exports = mongoose.model('Codewordset',codeWordSetSchema);