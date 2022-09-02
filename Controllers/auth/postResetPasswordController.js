const User = require("../../Modals/User");

const postResetPasswordController = (req, res, next) => {
  const { email } = req.body;

  const failureCallback = (error) => {
    console.log("The error occurred is :", error);
  };

  User.find({ email })
    .then((user) => {
      if (!user) {
        req.flash("error", "user not found against the email.");
        return res.redirect("/auth/reset-password");
      }
    })
    .catch(failureCallback);

  return res.send(`will send an email to ${email}`);
};

module.exports = postResetPasswordController;
