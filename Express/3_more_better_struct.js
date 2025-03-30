const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json()); //For using Middleware
const tours = JSON.parse(fs.readFileSync('./data/tours-simple.json'));

// get all Tours
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

// get tour by id
const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(200).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

// creating the tour
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile('./data/tours-simple.json', JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  });
};

// update tour
const updateTour = (req, res) => {
  const id = req.params.id * 1;
  if (!id > tours.length) {
    return res.status(404).JSON({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  return res.status(200).json({
    status: 'success',
    data: {
      tour: 'updated tour here...',
    },
  });
};

// delete the tour
const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  if (!id > tours.length) {
    return res.status(404).JSON({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  return res.status(200).json({
    status: 'success',
    data: null,
  });
};

const TourRouter = express.Router();
const UserRouter = express.Router();

// tour router
TourRouter.route('/').get(getAllTours).post(createTour);
TourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

// user router
// this routes api are not yet created in this file just we are assuming these api are here and now create the route for this in seperate file
UserRouter.route('/').get(getAllUser).post(createuser);
UserRouter.route('/:id').get(getUser).patch(updateUser).delete(deletUser);

app.use('/api/v1/tours', TourRouter);
app.use('/api/v1/users', UserRouter);
app.listen(8000, () => console.log('Server has Started on port 8000'));



// now we have two router one is tour and one is user , so we are going to use the route folder which is better file struct than this.