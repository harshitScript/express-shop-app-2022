const getSignUpController = (req, res) => {
  return res.render("auth/signup-form", {
    docTitle: "Sign-up",
    docFooter: "The sign up form.",
    path: "/auth/signup",
    noNavigation: false,
    error: req.flash("error")[0],
    success: req.flash("success")[0],
    validation_errors: req.flash("validation_error"),
  });
};

module.exports = getSignUpController;
