require('dotenv').config()

const configuration = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    dbConfiguration: process.env.CONFIG_MONGO,
    dbUser: process.env.USER_DATABASE,
    dbPassword: process.env.PASSWORD_DATABASE,
    dbHost: process.env.DATABASE_HOST,
    dbName: process.env.DATABASE_NAME,
}

module.exports = {configuration};