const app = require('./4_using_different_files_for_router');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { type } = require('superagent/lib/utils');

dotenv.config({ path: './config.env' });

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log('Connected to db, yeahhhhhh 🎉'))
  .catch((err) => console.error('Database connection error:', err));

const port = 8000;
app.listen(port, () => console.log(`Server has Started on port ${port}`));

// mongoose is an object data modeling (ODM) library
