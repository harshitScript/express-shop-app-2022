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
    isAuthenticated: req.isAuthenticated,
  });
};

module.exports = getLoginFormController;
