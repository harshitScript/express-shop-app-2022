const User = require("../../Modals/User");

const getNewPasswordFormController = (req, res, next) => {
  const { reset_token: resetPasswordToken } = req.params;

  const failureCallback = (error) => {
    error.httpStatusCode = 500;
    return next(error);
  };

  User.findOne({
    resetPasswordToken,
    resetPasswordTokenExpiryDate: { $gt: Date.now() },
  })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid token");
        return res.redirect("/auth/reset-password");
      }
      return res.render("auth/new-password-form", {
        docTitle: "New Password Form",
        docFooter: "Reset your previous password.",
        path: "/auth/reset-password",
        noNavigation: false,
        errorMessage: req.flash("error")[0],
        userId: user?._id,
        csrfToken: req.csrfToken(),
        resetPasswordToken: user.resetPasswordToken,
      });
    })
    .catch(failureCallback);
};

module.exports = getNewPasswordFormController;
