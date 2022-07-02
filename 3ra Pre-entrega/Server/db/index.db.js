const { configuration } = require('../config/config');
const mongoose = require('mongoose');

const USER = encodeURIComponent(configuration.dbUser);
const PASSWORD = encodeURIComponent(configuration.dbPassword);

const URI = `${configuration.dbConfiguration}://${USER}:${PASSWORD}@${configuration.dbHost}/${configuration.dbName}`;

const connect = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
  } catch (err) {
    console.log(err);
  }
};

module.exports = connect;
