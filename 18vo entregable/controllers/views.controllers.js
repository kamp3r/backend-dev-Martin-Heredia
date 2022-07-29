const { productHandler } = require("../daos");

const redirectHome = (req, res) => {
  res.redirect("/home");
};

const viewHome = (req, res) => {
  res.render("home", {
    title: "home",
    user: req.user,
    cart: req.session.cart,
  });
};

const viewProduct = async (req, res) => {
  const products = await productHandler.getProducts();
  res.render("products", {
    products,
    title: "products",
    user: req.user,
    cart: req.session.cart,
  });
};

const viewRegister = (req, res) => {
  res.render("register", {
    title: "register",
    user: req.user,
    cart: req.session.cart,
  });
};

const viewLogin = (req, res) => {
  res.render("login", {
    title: "login",
    user: req.user,
    cart: req.session.cart,
  });
};

const viewProfile = (req, res) => {
  res.render("profile", {
    title: "profile",
    user: req.user,
    cart: req.session.cart,
  });
};

const viewEditProfile = (req, res) => {
  res.render("edit", {
    PATCH: true,
    title: "editProfile",
    user: req.user,
    cart: req.session.cart,
  });
};

const viewLogout = (req, res) => {
  res.clearCookie("turbinasunmira");
  res.render("logout", {
    title: "logout",
    user: req.user,
    cart: req.session.cart,
  });
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
};

const viewAbout = (req, res) => {
  res.render("about", {
    title: "about",
    user: req.user,
    cart: req.session.cart,
  });
};

const viewContact = (req, res) => {
  res.render("contact", {
    title: "contact",
    user: req.user,
    cart: req.session.cart,
  });
};

const viewProductDetail = async (req, res) => {
  const product = await productHandler.getProductById(req.params.id);
  res.render("productDetail", {
    product,
    title: `${product.name}`,
    user: req.user,
    cart: req.session.cart,
  });
};

const viewCheckout = (req, res) => {
  if (req.session.cart == undefined) {
    req.session.cart = [];
  }
  res.render("checkout", {
    title: "checkout",
    user: req.user,
    cart: req.session.cart,
  });
};

const viewAdmin = async (req, res) => {
  const products = await productHandler.getProducts();
  res.render("admin", {
    products,
    title: "admin",
    user: req.user,
    cart: req.session.cart,
  });
};

const viewAdminProduct = (req, res) => {
  res.render("addProducts", {
    title: "addProducts",
    user: req.user,
    cart: req.session.cart,
  });
};

const viewAdminUpdateProduct = async (req, res) => {
  const product = await productHandler.getProductById(req.params.id);
  res.render("updateProd", {
    PATCH: true,
    product,
    title: "updateProd",
    user: req.user,
    cart: req.session.cart,
  });
};

module.exports = {
  redirectHome,
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
};
