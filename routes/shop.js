const express = require("express");
const bodyParser = require("body-parser");

//? Product imports
const getProductListController = require("../controllers/shop/products/getProductListController");
const getOrdersController = require("../controllers/shop/order/getOrdersController");
const postOrdersController = require("../controllers/shop/order/postOrdersController");
const getProductDetailsController = require("../controllers/shop/products/getProductDetailsController");
//? Cart imports
const getCartController = require("../controllers/shop/cart/getCartController");
const addToCartController = require("../controllers/shop/cart/addToCartController");
const deleteCartProductController = require("../controllers/shop/cart/deleteCartProductController");
const getOrderOverviewController = require("../controllers/shop/order/getOrderOverviewController");

const shopRoutes = express.Router();

shopRoutes.post(
  "/cart/:id/delete",
  bodyParser.urlencoded({ extended: false }),
  deleteCartProductController
);

shopRoutes.post(
  "/cart/:id",
  bodyParser.urlencoded({ extended: false }),
  addToCartController
);

shopRoutes.get("/cart", getCartController);

shopRoutes.get("/orders", getOrdersController);

shopRoutes.post("/orders", postOrdersController);

shopRoutes.get("/order-overview/:orderId", getOrderOverviewController);

shopRoutes.get("/product-details/:id", getProductDetailsController);

shopRoutes.get("/", getProductListController);

module.exports = shopRoutes; //? a valid middleware
