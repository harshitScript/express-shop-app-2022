const User = require("../../Modals/User");
const crypto = require("crypto");
const { createTransport } = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

const transport = createTransport(
  sendGridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

const postResetPasswordController = (req, res, next) => {
  const { email } = req.body;

  const failureCallback = (error) => {
    error.httpStatusCode = 500;
    return next(error);
  };

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        req.flash("error", "user not found against the email.");
        return res.redirect("/auth/reset-password");
      }

      crypto.randomBytes(32, (err, buffer) => {
        if (err) {
          req.flash("error", "Token generation error.");
          return res.redirect("/auth/reset-password");
        }

        const token = buffer.toString("hex");

        user.resetPasswordToken = token;
        user.resetPasswordTokenExpiryDate = Date.now() + 3600000;

        user
          .save()
          .then(() => {
            transport
              .sendMail({
                to: user.email,
                from: process.env.SERVER_MAIL,
                subject: `Password Reset Link`,
                text: `This link is only valid for one hour.`,
                html: `<a href="http://localhost:4000/auth/reset-password/${token}">Click here</a>`,
              })
              .then(() => {});
            req.flash("success", "Follow the link in email sent to you.");
            return res.redirect("/");
          })
          .catch(failureCallback);
      });
    })
    .catch(failureCallback);
};

module.exports = postResetPasswordController;
