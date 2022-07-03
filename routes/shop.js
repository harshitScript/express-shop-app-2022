const express = require("express");
const bodyParser = require("body-parser");

//? Product imports
const getProductListController = require("../controllers/shop/products/getProductListController");
const getCheckoutController = require("../controllers/shop/products/getCheckoutController");
const getIndexController = require("../controllers/shop/products/getIndexController");
const getProductDetailsController = require("../controllers/shop/products/getProductDetailsController");
//? Cart imports
const getCartController = require("../controllers/shop/cart/getCartController");
const addToCartController = require("../controllers/shop/cart/addToCartController");
const deleteCartProductController = require("../controllers/shop/cart/deleteCartProductController");

const shopRoutes = express.Router();

shopRoutes.get("/", getProductListController); //? we can define multiple middleware/requestHandler.

shopRoutes.get("/cart", getCartController);

shopRoutes.post(
  "/cart/:id",
  bodyParser.urlencoded({ extended: false }),
  addToCartController
);

shopRoutes.post(
  "/cart/:id/delete",
  bodyParser.urlencoded({ extended: false }),
  deleteCartProductController
);

shopRoutes.get("/checkout", getCheckoutController);

shopRoutes.get("/home", getIndexController);

shopRoutes.get("/product-details/:id", getProductDetailsController);

module.exports = shopRoutes; //? a valid middleware
