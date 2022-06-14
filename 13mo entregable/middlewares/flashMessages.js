export const flashMessages = (app)=>{
    app.use((req, res, next)=>{
       app.locals.signUpMessage = req.flash('signUpMessage');
       app.locals.signInMessage = req.flash('signInMessage');
       app.locals.signInPassword = req.flash('signInPassword');
       next();
    })
}

