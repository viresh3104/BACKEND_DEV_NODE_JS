const express = require('express');
const fs = require('fs');
const app = express();

// importing router from routes
const TourRouter = require('./routes/tourRouter');
// const UserRouter = require('./routes/userRouter');

app.use(express.json()); //For using Middleware

app.use('/api/v1/tours', TourRouter);
// app.use('/api/v1/users', UserRouter);
// now we have two router one is tour and one is user , so we are going to use the route folder which is better file struct than this.

module.exports = app;

// now from the last file here are using 3 different files
// one for the controller
// one for the router or middle ware or model
// one for the server or main file
