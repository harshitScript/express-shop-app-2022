const express = require("express");

const homeRoute = express.Router();

const getHomeController = require("../controllers/home/getHomeController");

homeRoute.get("/", getHomeController);

module.exports = homeRoute;
