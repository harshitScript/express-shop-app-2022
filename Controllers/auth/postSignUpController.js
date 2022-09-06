const User = require("../../Modals/User");
const { generateHashedPassword } = require("../../util/helper");

const postSignUpController = (req, res) => {
  const { name, email, password, role } = req.body;

  const hashedPassword = generateHashedPassword("sha512", password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    cart: [],
    orderIds: [],
    ordersPlaced: 0,
    role,
  });

  const failureCallback = (error) => {
    console.log("The error is : ", error);
  };

  const successCallback = () => {
    return res.redirect("/auth/login");
  };

  user.save().then(successCallback).catch(failureCallback);
};

module.exports = postSignUpController;
