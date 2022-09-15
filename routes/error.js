const express = require("express");
const expressErrorController = require("../Controllers/error/expressErrorController");
const notFoundController = require("../controllers/error/notFoundController");
const serverErrorController = require("../Controllers/error/serverErrorController");

const errorRoute = express.Router();

errorRoute.get("/server-error", serverErrorController);

errorRoute.use(notFoundController);

errorRoute.use(expressErrorController);

module.exports = errorRoute;
