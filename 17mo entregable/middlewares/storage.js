const sessionStorage = (app) =>{
    (req, res, next) => {
        res.local.user = req.user;
        res.locals.session = req.session
        next();
}
}

module.exports = sessionStorage;