const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'user must confirm password'],
    // custom validator for the checking these two password mathces or not
    // this will only work when we will save or create , not in the case of forgot password
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are Not Matching',
    },
  },
});

// encryption
// pre middleware hook runs when getting the data and saving it
userSchema.pre('save', async function (next) {
  // below line ensures that password is modified or created
  if (!this.isModified('password')) return next();

  // hash the password with 12length random string known as cost
  this.password = await bcrypt.hash(this.password, 12);
  // delete the conform pass word field , cause we dont need this cause we already validated in the model
  this.confirmPassword = undefined;
  next();
});

// decrypt pass to compare it while login with user entered password
userSchema.methods.correctPassword = async function (enteredPass, storedPass) {
  return await bcrypt.compare(enteredPass, storedPass);
};

const User = mongoose.model('User', userSchema);
module.exports = User; // export the model
