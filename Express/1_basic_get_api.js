const express = require('express');
const fs = require('fs');

const app = express();

const tours = JSON.parse(fs.readFileSync('./data/tours-simple.json'));

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results:tours.length,
    data: {
      tours:tours
    }
  });
});


app.post('/', (req, res) => {
  res.status(200).send('hi from post');
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});



// here we can now access the data in this api/v1/tours url in postman