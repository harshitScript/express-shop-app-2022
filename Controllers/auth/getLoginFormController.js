const getLoginFormController = (req, res) => {
  return res.render("auth/login-form", {
    docTitle: "Login Form",
    docFooter: "Login to start shopping.",
    path: "/auth/login",
    noNavigation: false,
  });
};

module.exports = getLoginFormController;
