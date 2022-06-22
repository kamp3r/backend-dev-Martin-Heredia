const passport = require('passport');
const logger = require('../logger/logger');

const loginRouter = require('express').Router();

loginRouter.get('/', (req, res) => {
  if (!req.isAuthenticated()) {
    res.render('login');
  } else {
    res.redirect('/home');
    logger.info('El usuario se valido correctamente')
  }
});

loginRouter.post('/', passport.authenticate('signin', {
    successRedirect: '/home',
    failureRedirect: '/login',
    passReqToCallback: true,
  })
);

module.exports = loginRouter;
