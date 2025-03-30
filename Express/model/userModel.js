const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'user must have a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'user must have a email'],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'enter a valid email'],
  },
  photo: String, // path of the photo
  password: {
    type: String,
    required: [true, 'user must have a password'],
    minlength: 8,
    trim: true,
  },
  confirmPassword: {
    type: String,
    required: [true, 'user must confirm password'],
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User; // export the model
