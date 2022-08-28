const getSignUpController = (req, res) => {
  return res.render("auth/signup-form", {
    docTitle: "Sign-up",
    docFooter: "The sign up form.",
    path: "/auth/signup",
    noNavigation: false,
    isAuthenticated: req.isAuthenticated,
  });
};

module.exports = getSignUpController;