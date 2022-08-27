const express = require("express");
const bodyParser = require("body-parser");

const getLoginFormController = require("../Controllers/auth/getLoginFormController");
const postLoginController = require("../Controllers/auth/postLoginController");
const getLogoutController = require("../Controllers/auth/getLogoutController");
const getSignUpController = require("../Controllers/auth/getSignUpController");
const postSignUpController = require("../Controllers/auth/postSignUpController");

const authRoutes = express.Router();

authRoutes.get("/login", getLoginFormController);

authRoutes.post(
  "/authenticating",
  bodyParser.urlencoded({ extended: false }),
  postLoginController
);

authRoutes.get("/logout", getLogoutController);

authRoutes.get("/signup", getSignUpController);

authRoutes.post(
  "/signup-user",
  bodyParser.urlencoded({ extended: false }),
  postSignUpController
);

module.exports = authRoutes;
