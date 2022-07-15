const MongoStore = require('connect-mongo');
const session = require('express-session');
const { URI } = require('../../db/index.db');

const connectSession = (app) => {
  app.use(
    session({
      secret: process.env.SECRET_COOKIE,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: URI,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
      name: String(process.env.COOKIENAME)
    })
  );
};

module.exports = connectSession;