const User = require("../../Modals/User");
const { generateHashedPassword } = require("../../util/helper");
const { validationResult } = require("express-validator");

const postLoginController = (req, res) => {
  const { email, password } = req.body;

  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    req.flash("validation_error", validationErrors?.errors);
    req.flash("old_input", { email });
    res.status(422);
    return res.redirect("/auth/login");
  }

  User.findOne({
    email,
    password: generateHashedPassword("sha512", password),
  })
    .then((user) => {
      if (user) {
        req.session.userId = user?._id;
        return req.session.save((err) => {
          if (err) {
            req.flash("error", "Error creating session.");
            return res.redirect("/auth/login");
          }

          return res.redirect(
            user.role === "admin" ? "/admin/products" : "/shop/"
          );
        });
      }
      req.flash("error", "User not found.");
      return res.redirect("/auth/login");
    })
    .catch((error) => {
      error.httpStatusCode = 500;
      return next(error);
    });
};

module.exports = postLoginController;
