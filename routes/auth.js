const express = require("express");
const { urlencoded } = require("body-parser");
const { body, header, query, param, check } = require("express-validator");

const User = require("../Modals/User");
const getLoginFormController = require("../Controllers/auth/getLoginFormController");
const postLoginController = require("../Controllers/auth/postLoginController");
const postLogoutController = require("../Controllers/auth/postLogoutController");
const getSignUpController = require("../Controllers/auth/getSignUpController");
const postSignUpController = require("../Controllers/auth/postSignUpController");
const getResetPasswordController = require("../Controllers/auth/getResetPasswordController");
const postResetPasswordController = require("../Controllers/auth/postResetPasswordController");
const getNewPasswordFormController = require("../Controllers/auth/getNewPasswordFormController");
const postNewPasswordController = require("../Controllers/auth/postNewPasswordController");
const csrf = require("csurf");

const authRoutes = express.Router();

authRoutes.get("/login", csrf(), getLoginFormController);

authRoutes.get(
  "/reset-password/:reset_token",
  csrf(),
  getNewPasswordFormController
);

authRoutes.post(
  "/save-new-password",
  urlencoded({ extended: false }),
  csrf(),
  postNewPasswordController
);

authRoutes.get("/reset-password", csrf(), getResetPasswordController);

authRoutes.post(
  "/reset-password",
  urlencoded({ extended: false }),
  csrf(),
  postResetPasswordController
);

authRoutes.post(
  "/authenticating",
  urlencoded({ extended: false }),
  csrf(),
  [
    body("email").isEmail().withMessage("Email not valid.").normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 5, max: 15 })
      .withMessage("Password Must be between 5-15 characters"),
  ],
  postLoginController
);

authRoutes.post("/logout", csrf(), postLogoutController);

authRoutes.get("/signup", csrf(), getSignUpController);

authRoutes.post(
  "/signup-user",
  urlencoded({ extended: false }),
  csrf(),
  [
    body("name")?.trim().isString().withMessage("Name must be in characters"),
    body("email")
      .isEmail()
      .withMessage("Email not valid.")
      .custom((value) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            //* Used to throw error from inside the promises.
            return Promise.reject("Email id already exist.");
          }
        });
      })
      .normalizeEmail(),

    body("password")
      ?.trim()
      ?.isLength({ min: 5, max: 15 })
      .withMessage("Password Must be between 5-15 characters"),

    body("confirm-password")
      ?.trim()
      ?.isLength({ min: 5, max: 15 })
      .withMessage("Password Must be between 5-15 characters")
      .custom((value, { req }) => {
        //? USED TO DEFINE CUSTOM ERRORS VALIDATOR METHODS
        if (value !== req.body.password) {
          throw new Error("Password not matched !");
        }
        return true;
      }),
  ],
  postSignUpController
);

module.exports = authRoutes;
