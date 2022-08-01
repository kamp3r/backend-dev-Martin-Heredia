const { configuration } = require('../config/config');
const USER = encodeURIComponent(configuration.dbUser);
const PASSWORD = encodeURIComponent(configuration.dbPassword);

const URI = `${configuration.dbConfiguration}://${USER}:${PASSWORD}@${configuration.dbHost}/${configuration.dbName}`;

module.exports = URI;
