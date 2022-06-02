import express from 'express';
import passport from 'passport'
 
const registerRouter = express.Router();

registerRouter.get('/', (req, res, next) => {
    res.render('register');
})

registerRouter.post('/', passport.authenticate('signup', {successRedirect: '/login', failureRedirect:'/register', passReqToCallback:true})

)

export default registerRouter;