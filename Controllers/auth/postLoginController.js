const User = require("../../Modals/User");
const { generateHashedPassword } = require("../../util/helper");

const postLoginController = (req, res) => {
  const { email, password } = req.body;

  User.findOne({
    email,
    password: generateHashedPassword("sha512", password),
  })
    .then((user) => {
      req.session.userId = user?._id;
      req.session.save((err) => {
        if (err) return console.log("error occurred while saving the session.");
        return res.redirect("/shop/");
      });
    })
    .catch(() => {
      console.log("User not found.");
    });
};

module.exports = postLoginController;
