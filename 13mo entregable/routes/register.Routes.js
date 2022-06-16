const passport = require('passport');

const registerRouter = require('express').Router();

registerRouter.get('/', (req, res, next) => {
  res.render('register');
});

registerRouter.post(
  '/',
  passport.authenticate('signup', {
    successRedirect: '/login',
    failureRedirect: '/register',
    passReqToCallback: true,
  })
);

module.exports = registerRouter;
