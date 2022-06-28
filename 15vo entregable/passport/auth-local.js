const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { userDao } = require('../daos/index.daos.js');

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'userName',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, userName, password, done) => {
      const userSign = await userDao.findOne({ email: userName });
      if (userSign) {
        return done(
          null,
          false,
          req.flash('signUpMessage', 'Email is already taken.')
        );
      }

      const userData = {
        email: userName,
        password: userDao.encryptPassword(password),
      };
      await userDao.saveData(userData);
      done(null, userDao);
    }
  )
);

passport.use(
  'signin',
  new LocalStrategy(
    {
      usernameField: 'userName',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, userName, password, done) => {
      const userAuth = await userDao.findOne({ email: userName });
      if (!userAuth) {
        return done(
          null,
          false,
          req.flash('signInMessage', 'Error in your data, verify this')
        );
      }
      if (!userDao.compareEncrypt(password, userAuth.password)) {
        return done(
          null,
          false,
          req.flash('signInPassword', 'Error in your data, verify please')
        );
      }

      done(null, userDao);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (username, done) => {
  const user = await userDao.findOne(username);
  done(null, user);
});
