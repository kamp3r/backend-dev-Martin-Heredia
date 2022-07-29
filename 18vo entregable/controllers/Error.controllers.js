const errorHandler = async (err, req, res, next) => {
  const error = new Error("Not Found");
  res.render("error", {
    error,
    title: "Error",
    user: req.user,
  });
};

module.exports = errorHandler;