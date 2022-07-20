const express = require("express");
const bodyParser = require("body-parser");

//? Product imports
const getProductListController = require("../controllers/shop/products/getProductListController");
const getOrdersController = require("../controllers/shop/products/getOrdersController");
const postOrdersController = require("../controllers/shop/products/postOrdersController");
const getProductDetailsController = require("../controllers/shop/products/getProductDetailsController");
//? Cart imports
const getCartController = require("../controllers/shop/cart/getCartController");
const addToCartController = require("../controllers/shop/cart/addToCartController");
const deleteCartProductController = require("../controllers/shop/cart/deleteCartProductController");
const getOrderOverviewController = require("../controllers/shop/order/getOrderOverviewController");

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

shopRoutes.get("/orders", getOrdersController);

shopRoutes.post("/orders", postOrdersController);

shopRoutes.get("/order-overview/:orderId", getOrderOverviewController);

shopRoutes.get("/product-details/:id", getProductDetailsController);

module.exports = shopRoutes; //? a valid middleware
