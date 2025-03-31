const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');

// add apis here just like the tourRouter

const UserRouter = express.Router();

UserRouter.post('/signup', authController.signup);
UserRouter.post('/login', authController.login);

// user router
// this routes api are not yet created in this file just we are assuming these api are here and now create the route for this in seperate file
UserRouter.route('/').get(userController.getAllUser).post(userController.createuser);
UserRouter.route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = UserRouter;
