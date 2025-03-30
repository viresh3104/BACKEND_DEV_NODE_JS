const express = require('express');

// add apis here just like the tourRouter

const UserRouter = express.Router();

// user router
// this routes api are not yet created in this file just we are assuming these api are here and now create the route for this in seperate file
UserRouter.route('/').get(getAllUser).post(createuser);
UserRouter.route('/:id').get(getUser).patch(updateUser).delete(deletUser);
module.exports = UserRouter; 