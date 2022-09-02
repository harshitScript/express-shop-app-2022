const express = require("express");
const bodyParser = require("body-parser");

const getLoginFormController = require("../Controllers/auth/getLoginFormController");
const postLoginController = require("../Controllers/auth/postLoginController");
const postLogoutController = require("../Controllers/auth/postLogoutController");
const getSignUpController = require("../Controllers/auth/getSignUpController");
const postSignUpController = require("../Controllers/auth/postSignUpController");
const getResetPasswordController = require("../Controllers/auth/getResetPasswordController");
const postResetPasswordController = require("../Controllers/auth/postResetPasswordController");

const authRoutes = express.Router();

authRoutes.get("/login", getLoginFormController);

authRoutes.get("/reset-password", getResetPasswordController);

authRoutes.post("/reset-password", postResetPasswordController);

authRoutes.post(
  "/authenticating",
  bodyParser.urlencoded({ extended: false }),
  postLoginController
);

authRoutes.post("/logout", postLogoutController);

authRoutes.get("/signup", getSignUpController);

authRoutes.post(
  "/signup-user",
  bodyParser.urlencoded({ extended: false }),
  postSignUpController
);

module.exports = authRoutes;
