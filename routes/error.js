const express = require("express");

const errorController = require("../controllers/shop/error/errorController");

const errorRoute = express.Router();

errorRoute.use(errorController);

module.exports = errorRoute;
