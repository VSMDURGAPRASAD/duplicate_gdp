const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  isInstructor: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  requestforInstructorAcess: {
    type : Boolean,
    required : false
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
