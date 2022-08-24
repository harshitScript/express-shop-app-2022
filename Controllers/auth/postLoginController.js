const User = require("../../Modals/User");

const postLoginController = (req, res) => {
  const { email, password } = req.body;

  User.findOne({
    email,
    password,
  })
    .then((user) => {
      req.session.userId = user?._id;
      return res.redirect("/shop/");
    })
    .catch(() => {
      console.log("User not found.");
    });
};

module.exports = postLoginController;
