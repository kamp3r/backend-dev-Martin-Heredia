import express from 'express';
import passport from 'passport'

const loginRouter = express.Router();

loginRouter.get('/', (req, res) => {
  if(!req.isAuthenticated()){
    res.render('login');
  }else{
    res.redirect('/home')
  }

});

loginRouter.post('/', passport.authenticate('signin', {successRedirect: '/home', failureRedirect:'/login', passReqToCallback:true}))


export default loginRouter;
