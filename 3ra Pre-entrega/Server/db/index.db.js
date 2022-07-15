const { configuration } = require('../config/config');
const mongoose = require('mongoose');
const logger = require("../logger/logger.js");

const USER = encodeURIComponent(configuration.dbUser);
const PASSWORD = encodeURIComponent(configuration.dbPassword);

const URI = `${configuration.dbConfiguration}://${USER}:${PASSWORD}@${configuration.dbHost}/${configuration.dbName}`;

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

module.exports = {connect, URI};
