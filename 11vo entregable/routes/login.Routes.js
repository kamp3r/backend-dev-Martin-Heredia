import express from 'express';
import passport from 'passport'

const loginRouter = express.Router();

loginRouter.get('/', (req, res) => {
  res.render('login');
});

loginRouter.post('/', passport.authenticate('signin', {successRedirect: '/home', failureRedirect:'/login', passReqToCallback:true}))


export default loginRouter;
