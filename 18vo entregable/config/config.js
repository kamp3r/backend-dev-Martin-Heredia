require('dotenv').config()
const yargs =  require('yargs');
const {hideBin} =  require('yargs/helpers');

const configuration = {
    env: process.env.NODE_ENV || 'development',
    dbConfiguration: process.env.CONFIG_MONGO,
    dbUser: process.env.USER_DATABASE,
    dbPassword: process.env.PASSWORD_DATABASE,
    dbHost: process.env.DATABASE_HOST,
    dbName: process.env.DATABASE_NAME,
    mail: process.env.MAIL,
    mailPass: process.env.MAILPASS,
    twilioSID: process.env.TWILIOSID,
    twilioTKN: process.env.TWILIOTOKEN
}

const { PORT } = yargs(hideBin(process.argv)).alias({
    p: 'port',
    c: 'cluster'
  }).default({
    PORT: process.env.PORT || process.argv[2],
    CLUSTER: 'fork'
  }).argv

module.exports = {configuration, PORT};