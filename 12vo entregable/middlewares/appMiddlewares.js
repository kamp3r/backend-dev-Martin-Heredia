import express from 'express';
import { flashMessages } from './flashMessages.js';
import { connectSession } from '../config/configDB.js';
import routerApi from '../routes/index.Routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import flash from 'connect-flash';

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

export default appMiddlewares;
