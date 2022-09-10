const User = require("../../Modals/User");
const { generateHashedPassword } = require("../../util/helper");
const { validationResult } = require("express-validator");

const postSignUpController = (req, res) => {
  const { name, email, password, role } = req.body;

  const validationErrors = validationResult(req);
  console.log("The validationErrors", validationErrors?.errors);
  if (!validationErrors.isEmpty()) {
    console.log();
    req.flash(
      "error",
      validationErrors?.errors.map((error) => `${error?.msg}`)
    );
    res.status(422);
    return res.redirect("/auth/signup");
  }

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
