const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('hi from get');
});

app.post('/', (req, res) => {
  res.status(200).send('hi from post');
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
