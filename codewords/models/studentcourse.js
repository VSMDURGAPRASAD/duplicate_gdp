const mongoose = require('mongoose')

const StudentCourseSchema = new mongoose.Schema({

  //_id: { type: Number, required: true },
  courseId: { type: String, required: true },
  studentEmail: {
    type: String,
    required: true
    
    
  },
  
  codeword: {
    type: String,
    required: false
    
  },

  isRead: {
    type: Boolean,
    required: false,
    default:false
    
  },
  
})
module.exports = mongoose.model('StudentCourse', StudentCourseSchema)
