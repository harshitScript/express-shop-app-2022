const express = require("express");
const notFoundController = require("../controllers/error/notFoundController");
const serverErrorController = require("../Controllers/error/serverErrorController");

const errorRoute = express.Router();

errorRoute.get("/server-error", serverErrorController);

errorRoute.use(notFoundController);

module.exports = errorRoute;
