const mongoose = require('mongoose');
const config = require('config');
const mongoDbUri = config.get('mongoURI');
// require('../models/models');

const connectDB = async () => {
  try {
    await mongoose.connect(
      mongoDbUri,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
      }, (err) => {
        if (err) throw err;
      }
    );
    console.log(`MongoDB is connected to ${mongoDbUri}`);
    // are these working?
    // mongoose.connection.on('connected', () => {
    //   console.log(`MongoDB is connected to ${mongoDbUri}`);
    // });
    // mongoose.connection.on('error', err => {
    //   console.log('Error while connecting to MongoDB', err);
    // });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;