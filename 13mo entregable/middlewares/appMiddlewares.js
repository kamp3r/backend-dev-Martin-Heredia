const express =  require('express');
const { flashMessages } =  require('./flashMessages.js');
const { connectSession } =  require('../config/configDB.js');
const routerApi =  require('../routes/index.Routes.js');
const cors =  require('cors');
const cookieParser =  require('cookie-parser');
const passport =  require('passport');
const flash =  require('connect-flash');

const appMiddlewares = (app) => {
  app.use(cors())
  app.use(express.static('public'));
  app.use(cookieParser());
  app.set('view engine', 'ejs');
  app.set('views', './public/views');
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  connectSession(app);
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
  flashMessages(app);
  routerApi(app);
};

module.exports = appMiddlewares;
