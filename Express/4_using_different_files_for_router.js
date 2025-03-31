const express = require('express');
const app = express();

// importing router from routes
const AppError = require('./utilis/appError');
const globalErrorHandler = require('./controller/errController');

const TourRouter = require('./routes/tourRouter');
const UserRouter = require('./routes/userRouter');

app.use(express.json()); //For using Middleware
app.use('/api/v1/tours', TourRouter);
app.use('/api/v1/users', UserRouter);

// for handling undefined routes
app.all('*', (req, res, next) => {
  //   res.status(404).json({app.use('/api/v1/tours', TourRouter);

  //     status: 'fail',
  //     message: `cant find ${req.originalUrl} on this server`,
  //   });

  // we can also use the err handlor
  //   const err = new Error(`can't find the ${req.originalUrl} in the server`);
  //   err.status = 'fail';
  //   err.statusCode = 404;
  //   next(err);

  // now by using the appError.js which is derived class of error i.e extension of global handlor , this is the one we are using
  next(new AppError(`can't find the${req.originalUrl} in the server`, 404));
});

// global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
// now from the last file here are using 3 different files
// one for the controller
// one for the router or middle ware or model
// one for the server or main file
