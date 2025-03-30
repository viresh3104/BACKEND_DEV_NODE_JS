const Tour = require('./../model/tourModel');

// get all tours
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Unable to send data',
    });
  }
};

// get tour by id
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Unable to send dataaaaaaaaaaax',
    });
  }
};

// creating the tour
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

// update tour
exports.updateTour = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(404).JSON({
      status: 'fail',
      message: 'Unable to Update data',
    });
  }
};

// delete the tour
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).JSON({
      status: 'fail',
      message: 'Unable to delete data',
    });
  }
};

exports.getTourStats = async (req, res) => {
  try {
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

    console.log('Stats:', stats); // Debugging log
    res.status(200).json({
      status: 'success',
      data: { stats },
    });
  } catch (err) {
    console.log('Error:', err); // Log the error
    res.status(400).json({
      status: 'fail',
      message: 'Error calculating tour statistics',
    });
  }
};

exports.getMontlyPlan = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Error while filtering montly plan',
    });
  }
};
