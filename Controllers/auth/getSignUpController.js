const getSignUpController = (req, res) => {
  return res.render("auth/signup-form", {
    docTitle: "Sign-up",
    docFooter: "The sign up form.",
    path: "/auth/signup",
    noNavigation: false,
    errors: req.flash("error"),
  });
};

module.exports = getSignUpController;
