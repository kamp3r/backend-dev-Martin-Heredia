const ejsRouter = require("express").Router();
const AuthUser = require('../middlewares/authUser.js');
const {
  redirectLogin,
  viewHome,
  viewProduct,
  viewRegister,
  viewLogin,
  viewProfile,
  viewEditProfile,
  viewLogout,
  viewAbout,
  viewContact,
  viewProductDetail,
  viewCheckout,
  viewAdmin,
  viewAdminProduct,
  viewAdminUpdateProduct,
} = require("../controllers/views.controllers");

ejsRouter.get("/", redirectLogin);

ejsRouter.get("/home",AuthUser, viewHome);

ejsRouter.get("/products",AuthUser, viewProduct);

ejsRouter.get("/register", viewRegister);

ejsRouter.get("/login", viewLogin);

ejsRouter.get("/profile", AuthUser, viewProfile);

ejsRouter.get("/editProfile", AuthUser, viewEditProfile);

ejsRouter.get("/logout", AuthUser, viewLogout);

ejsRouter.get("/about",AuthUser, viewAbout);

ejsRouter.get("/contact",AuthUser, viewContact);

ejsRouter.get("/detail/:id",AuthUser, viewProductDetail);

ejsRouter.get("/myCart/checkout",AuthUser, viewCheckout);

ejsRouter.get("/admin",AuthUser, viewAdmin);

ejsRouter.get("/admin/addProduct",AuthUser, viewAdminProduct);

ejsRouter.get("/editProduct/:id",AuthUser, viewAdminUpdateProduct);

module.exports = ejsRouter;
