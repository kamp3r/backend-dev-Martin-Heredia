const mongoose = require('mongoose');
const logger = require("../../utils/logger/logger.js");
const URI = require('../../config/uriMongoProtect.js');

const connect = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Database connected');
  } catch (err) {
    logger.error('Database connection error', err);
  }
};

module.exports = connect;