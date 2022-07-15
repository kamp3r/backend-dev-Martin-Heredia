const isAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()){
        res.locals.currentUser = req.user
        return next()
    }else{
        res.redirect('/')
    }
}

module.exports = isAuthenticated;