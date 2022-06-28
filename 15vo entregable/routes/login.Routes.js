const passport = require('passport');

const loginRouter = require('express').Router();

loginRouter.get('/', (req, res) => {
  if (!req.isAuthenticated()) {
    res.render('login');
  } else {
    res.redirect('/home');
  }
});

loginRouter.post(
  '/',
  passport.authenticate('signin', {
    successRedirect: '/home',
    failureRedirect: '/login',
    passReqToCallback: true,
  })
);

module.exports = loginRouter;
