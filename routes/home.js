const express = require("express");

const csrf = require("csurf");

const homeRoute = express.Router();

const getHomeController = require("../controllers/home/getHomeController");

homeRoute.get("/", csrf(), getHomeController);

module.exports = homeRoute;
