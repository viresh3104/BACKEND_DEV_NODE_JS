const express = require('express');

const TourController = require('../controller/tour_controller_with_mongo');
const TourRouter = express.Router();

// tour router
// these two for the viewing all tours and one is for creating new tour
TourRouter.route('/').get(TourController.getAllTours).post(TourController.createTour);
TourRouter.route('/tourstats').get(TourController.getTourStats);
TourRouter.route('/monthly-plan/:year').get(TourController.getMontlyPlan);

// these are for viewing tour by id, deleting and updating it
TourRouter.route('/:id')
  .get(TourController.getTour)
  .patch(TourController.updateTour)
  .delete(TourController.deleteTour);

// for export
module.exports = TourRouter;
