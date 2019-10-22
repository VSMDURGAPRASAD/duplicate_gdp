const mongoose = require ('mongoose');
const validator = require('validator');
//const mongoosePaginate = require('mongoose-paginate');


const CourseUserSchema = new mongoose.Schema ({

    CourseName: {
        type: String,
        require: true,
        //unique: true
    },
    
    email_id: {
        type: String,
        required: true,
        //unique: true,
        minlength: 5,
        validate:{
            validator: (value) =>{
                return validator.isEmail(value);
            }
        }        
    },

    first_name: {
        type: String
    },

    last_name: {
        type: String
    },

    codeword: {
        type: String,
        require: true,
        minlength: 5
    },

    Acknowledged: {
     type: Boolean,
     require: true,
     default: false
    },
    
   
});
 
 module.exports = mongoose.model('CourseUser',CourseUserSchema)