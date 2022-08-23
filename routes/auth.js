const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const getLoginFormController = require("../Controllers/auth/getLoginFormController");
const postLoginController = require("../Controllers/auth/postLoginController");

const authRoutes = express.Router();

authRoutes.get("/login", cookieParser(), getLoginFormController);

authRoutes.post(
  "/authenticating",
  bodyParser.urlencoded({ extended: false }),
  postLoginController
);

module.exports = authRoutes;