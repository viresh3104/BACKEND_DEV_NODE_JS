const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json()); //For using Middleware
const tours = JSON.parse(fs.readFileSync('./data/tours-simple.json'));




// api for creating the new tour
app.post('/api/v1/tours', (req, res) => {
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
});




// api for getting tour by id
app.post('/api/v1/tours/:id', (req, res) => {
  // convert id into int format
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  res.status(201).json({
    status: 'success',
    data: {
      tours: tour,
    },
  });
});





// api for updating tour by id
// patch will updaTE ONLY one object
// put will complete collection
app.patch('/api/v1/tours/:id', (req, res) => {
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
});





// api for delete
app.delete('/api/v1/tours/:id', (req, res) => {
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
});

app.listen(8000, () => console.log('Server has Started on port 8000'));
