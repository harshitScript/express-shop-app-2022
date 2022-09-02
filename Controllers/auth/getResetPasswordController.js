const getResetPasswordController = (req, res, next) => {
  return res.render("auth/reset-password.ejs", {
    docTitle: "Reset Password",
    docFooter: "The Reset Password form.",
    path: "/auth/reset-password",
    noNavigation: false,
    errorMessage: "",
  });
};

module.exports = getResetPasswordController;
