const AuthRouter = require("express").Router();
const passport = require("passport");
const { uploadImgUser } = require("../middlewares/multer.middleware");
const updateUser = require("../controllers/Auth.Controllers");
const validatorSchema = require("../middlewares/validatorSchema.middleware");
const {
  createUserSchema,
  updateUserSchema,
} = require("../schemas/user.schema");


AuthRouter.post("/register",uploadImgUser.single('picture'), validatorSchema(createUserSchema), passport.authenticate('signup',{ successRedirect: "/profile", failureRedirect: "/register", passReqToCallback: true }));

AuthRouter.post('/login', passport.authenticate('signin',{ successRedirect: "/profile", failureRedirect: "/login", passReqToCallback: true}))

AuthRouter.patch('/edit/:id',uploadImgUser.single('picture'),updateUserSchema('params'),updateUserSchema('body'), updateUser)


module.exports = AuthRouter;
