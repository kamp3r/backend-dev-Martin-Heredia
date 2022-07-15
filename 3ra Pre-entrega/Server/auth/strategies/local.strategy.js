const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { userHandler } = require("../../daos/");

passport.use('signin',new LocalStrategy({ usernameField: 'email', passReqToCallback: true}, async (req, email, password, done) => {
    try{
        const user = await userHandler.getUser(email, password);
        done(null, user);
    }catch(error){
        done(error, false);
    }
}));

passport.use('signup',new LocalStrategy({ usernameField: 'email', passReqToCallback: true}, async (req, email, password, done) => {
    const user = await userHandler.findOne({email: email});
        if(user){
            return done(null, false);
        }
    const userData = {
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.full_phone[1],
        password: req.body.password,
        address: req.body.address,
        picture: req.file.filename
    }
    const newUser = await userHandler.createUser(userData);
    done(null, newUser);
}))

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser(async (id, done) => {
    const user = await userHandler.getUserById(id);
    done(null, user);
})

