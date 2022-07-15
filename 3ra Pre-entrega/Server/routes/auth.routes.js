const AuthRouter = require("express").Router();
const passport = require("passport");
const { uploadImgUser } = require("../middlewares/multer.middleware");
const { userHandler } = require("../daos");
const validatorSchema = require("../middlewares/validatorSchema.middleware");
const {
  createUserSchema,
  updateUserSchema,
} = require("../schemas/user.schema");


AuthRouter.post("/register",uploadImgUser.single('picture'), validatorSchema(createUserSchema), passport.authenticate('signup',{ successRedirect: "/profile", failureRedirect: "/register", passReqToCallback: true }),
  
);

AuthRouter.post('/login', passport.authenticate('signin',{ successRedirect: "/profile", failureRedirect: "/login", passReqToCallback: true}))

AuthRouter.patch('/edit/:id',uploadImgUser.single('picture'), async(req, res, next) => {
    try {
        const data = {
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.full_phone[1],
            password: req.body.password
        }
        if(req.file){
            data.picture = req.file.filename
        }
        const user = await userHandler.updateUser(req.params.id, data);
        res.redirect('/profile');
      } catch (error) {
        next(error);
      }
})

module.exports = AuthRouter;
