const User = require("../../Modals/User");
const { generateHashedPassword } = require("../../util/helper");
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

const postLoginController = (req, res) => {
  const { email, password } = req.body;

  User.findOne({
    email,
    password: generateHashedPassword("sha512", password),
  })
    .then((user) => {
      if (user) {
        req.session.userId = user?._id;
        return req.session.save();
      }
      req.flash("error", "User not found.");
      res.redirect("/auth/login");
    })
    .then(() => {
      return transport.sendMail({
        to: email,
        from: process.env.SERVER_MAIL,
        subject: "Login successful.",
        html: "<p>welcome to your own express shop 2022.</p>",
      });
    })
    .then(() => {
      return res.redirect("/shop/");
    })
    .catch((error) => {
      console.log("The error is : ", error);
    });
};

module.exports = postLoginController;
