const Tour = require('./../model/tourModel');
const catchAsync = require('../utilis/catchAsync');

// get all tours
exports.getAllTours = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

// get tour by id
exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

// creating the tour and catching the error in the async function
exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
});

// update tour
exports.updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

// delete the tour
exports.deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);
  return res.status(200).json({
    status: 'success',
    data: null,
  });
});

exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingAvg: { $gte: 4 } }, // Fixed field name
    },
    {
      $group: {
        // _id: { $toUpper: '$difficulty' },
        _id: null,
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingQuantity' },
        avgRatings: { $avg: '$ratingAvg' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: { stats },
  });
});

exports.getMontlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;

  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTours: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: { _id: 0 }, // to hide the id in api
    },
    {
      $sort: { numTours: -1 }, // sort by month in that perticular year,
    },
    {
      $limit: 5, // this will only send 5 documents
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: { plan },
  });
});
