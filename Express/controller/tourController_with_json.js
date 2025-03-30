const fs = require('fs');
const path = require('path');
const Tour = require('./../model/tourModel');


const filePath = path.join(__dirname, '../data/tours-simple.json');
const tours = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

// get all tours
exports.getAllTours = (req, res) => {
  console.log('sent all tours');
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

// get tour by id
exports.getTour = (req, res) => {
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
exports.createTour = (req, res) => {
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
exports.updateTour = (req, res) => {
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
exports.deleteTour = (req, res) => {
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

// now suppose if we want tot check the id is valid or not in each and every api then we can easily do it with the param middleware
// we can check this id  outside the middleware
// once req hits param check it and then pass it tot the router fuction
// param middle have 4 parameters
//  req res next val

// if we want to show some static files or images then we can use app.use(express.static(file path));

// there are multiple enviroments in express like development, express , etc
// express uses bydefault development enviroment
// we can check the current env by this : conole.log(app.get('env));
// we can change it by using process.env.NODE_ENV = 'production'
 