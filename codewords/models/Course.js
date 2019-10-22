const mongoose = require ('mongoose');
// const validator = require('validator');

const courseSchema = new mongoose.Schema ({
    CourseName: {
        type: String
        //require: true,
        //unique: true
    },

    StartDate: {
        type: String
    },
    
    EndDate: {
        type: String
    },

    InitialSurveyLink: {
         type: String
    },

    FinalSurveyLink: {
        type: String

    },

    CodewordSet: {
        type: String
    }
});

module.exports = mongoose.model('Course',courseSchema)