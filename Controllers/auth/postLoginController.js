const User = require("../../Modals/User");
const { generateHashedPassword } = require("../../util/helper");

const postLoginController = (req, res) => {
  const { email, password } = req.body;

  User.findOne({
    email,
    password: generateHashedPassword("sha512", password),
  })
    .then((user) => {
      if (user) {
        req.session.userId = user?._id;
        return req.session.save((err) => {
          if (err)
            return console.log("error occurred while saving the session.");
          return res.redirect("/shop/");
        });
      }
      req.flash("error", "User not found.");
      return res.redirect("/auth/login");
    })
    .catch((error) => {
      console.log("The error is : ", error);
    });
};

module.exports = postLoginController;
