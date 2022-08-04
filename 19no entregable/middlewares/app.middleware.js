const express = require('express');
const routerAPI = require('../routes/index.routes');
const cors = require('cors');
const {
  boomErrorHandler,
  logErrors,
} = require('../middlewares/error.middleware');
const methodOverride = require('method-override');
const passport = require('passport');
const connectSession = require('../auth/session/session.js');
const cookieParser = require('cookie-parser');
const sessionStorage = require('../middlewares/storage.js');

const connectMiddleware = (app) => {
  app.use(cors())
  app.use(express.static('public'));
  app.set('view engine', 'ejs');
  app.set('views', './public/views');
  app.use(express.json());
  app.use(express.urlencoded({ extended: true })); 
  app.use(methodOverride('_method'));
  app.use(methodOverride('_action'))
  app.use(cookieParser())
  require('../auth/strategies/local.strategy.js');
  connectSession(app);
  app.use(passport.initialize());
  app.use(passport.session());
  sessionStorage(app);
  routerAPI(app);
  app.use(logErrors);
  app.use(boomErrorHandler);
};

module.exports = connectMiddleware;
