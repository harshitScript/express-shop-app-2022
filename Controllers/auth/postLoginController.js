const User = require("../../Modals/User");
const { objectIdToStringId } = require("../../util/helper");

const postLoginController = (req, res) => {
  const { email, password } = req.body;

  User.findOne({
    email,
    password,
  })
    .then((user) => {
      res.cookie("userId", objectIdToStringId(user?._id), {
        expires: new Date(Date.now() + 86400000),
        /* maxAge: 86400000,
        secure : true,
        httpOnly : true, */
      });
      return res.redirect("/shop/");
    })
    .catch(() => {
      console.log("User not found.");
    });
};

module.exports = postLoginController;
