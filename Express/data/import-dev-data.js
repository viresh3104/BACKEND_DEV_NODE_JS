const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('../model/tourModel');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log('Connected to db, yeahhhhhh 🎉'))
  .catch((err) => console.error('Database connection error:', err));

// read file data data
const tours = JSON.parse(fs.readFileSync('./tours-simple.json', 'utf-8'));

// import data to db
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('data successfully loaded');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('data deleted successfully');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

// console.log(process.argv);
