const User = require("../../Modals/User");
const { generateHashedPassword } = require("../../util/helper");

const postNewPasswordController = (req, res, next) => {
  const { new_password, userId, reset_password_token } = req.body;

  const failureCallback = (error) => {
    error.httpStatusCode = 500;
    return next(error);
  };

  User.findOne({
    _id: userId,
    resetPasswordToken: reset_password_token,
    resetPasswordTokenExpiryDate: { $gt: Date.now() },
  })
    .then((user) => {
      if (!user) {
        req.flash("error", "Unwanted Error Occurred.");
        return res.redirect("/auth/reset-password");
      }
      user.password = generateHashedPassword("sha512", new_password);
      user.resetPasswordToken = undefined;
      user.resetPasswordTokenExpiryDate = undefined;
      return user.save();
    })
    .then(() => {
      req.flash("success", "Password Reset Successful.");
      return res.redirect("/auth/login");
    })
    .catch(failureCallback);
};

module.exports = postNewPasswordController;
