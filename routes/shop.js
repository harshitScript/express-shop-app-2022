const express = require("express");

const getProductListController = require("../controllers/shop/products/getProductListController");
const getCartController = require("../controllers/shop/products/getCartController");
const getCheckoutController = require("../controllers/shop/products/getCheckoutController");
const getIndexController = require("../controllers/shop/products/getIndexController");
const getProductDetailsController = require("../controllers/shop/products/getProductDetailsController");

const shopRoutes = express.Router();

shopRoutes.get("/", getProductListController); //? we can define multiple middleware/requestHandler.

shopRoutes.get("/cart", getCartController);

shopRoutes.get("/checkout", getCheckoutController);

shopRoutes.get("/home", getIndexController);

shopRoutes.get("/product-details", getProductDetailsController);

module.exports = shopRoutes; //? a valid middleware
