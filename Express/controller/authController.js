// using this to hold all the logic for authentication and login
const User = require('../model/userModel');
const catchAsync = require('../utilis/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('../utilis/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  const token = signToken(newUser._id);

  res.status(200).json({
    status: 'success',
    token,
    data: { user: newUser },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) check email and password exits
  if (!email || !password) {
    return next(new AppError('Please Provide email and password!', 400));
  }

  // 2) check user exits and password is correct
  const user = await User.findOne({ email }).select('+password');
  console.log(user);
  // at this step we have user entered password and email but password we have in our database in
  // encrypted so to compare it with user entered password we have to decrypt in the model itself

  // const correct = await user.correctPassword(user.password, password);
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) if everything is ok , send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});
