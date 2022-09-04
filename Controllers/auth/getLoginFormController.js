const getLoginFormController = (req, res) => {
  const { isAuthenticated } = req;

  if (isAuthenticated) {
    return res.redirect("/shop/");
  }

  return res.render("auth/login-form", {
    docTitle: "Login Form",
    docFooter: "Login to start shopping.",
    path: "/auth/login",
    noNavigation: false,
    successMessage: req.flash("success")[0],
    errorMessage: req.flash("error")[0],
  });
};

module.exports = getLoginFormController;
