const User = require('../model/userModel');
const catchAsync = require('../utilis/catchAsync');

exports.getAllUser = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    data: { users },
  });
});
exports.createuser = async (req, res) => {};
exports.getUser = async (req, res) => {};
exports.updateUser = async (req, res) => {};
exports.deleteUser = async (req, res) => {};
