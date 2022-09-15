const User = require("../../Modals/User");
const { generateHashedPassword } = require("../../util/helper");
const { validationResult } = require("express-validator");

const postSignUpController = (req, res, next) => {
  const { name, email, password, role } = req.body;

  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    req.flash("validation_error", validationErrors?.errors);
    req.flash("old_input", { name, email, role });
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
    const tempError = new Error(error?.message);
    tempError.httpStatusCode = 500;
    next(tempError);
  };

  const successCallback = () => {
    return res.redirect("/auth/login");
  };

  user.save().then(successCallback).catch(failureCallback);
};

module.exports = postSignUpController;
