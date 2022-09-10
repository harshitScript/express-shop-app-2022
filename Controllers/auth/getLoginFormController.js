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
    success: req.flash("success")[0],
    error: req.flash("error")[0],
    validation_errors: req.flash("validation_error"),
    old_email: req.flash("old_input")[0]?.email || "",
  });
};

module.exports = getLoginFormController;
