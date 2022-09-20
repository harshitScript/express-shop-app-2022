const express = require("express");
const { urlencoded } = require("body-parser");
const csrf = require("csurf");

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
//? Auth imports
const isUserAuthMiddleware = require("../Controllers/middleware/isUserAuthMiddleware");

const shopRoutes = express.Router();

shopRoutes.post(
  "/cart/:id/delete",
  isUserAuthMiddleware,
  urlencoded({ extended: false }),
  csrf(),
  deleteCartProductController
);

shopRoutes.post(
  "/cart/:id",
  isUserAuthMiddleware,
  urlencoded({ extended: false }),
  csrf(),
  addToCartController
);

shopRoutes.get("/cart", isUserAuthMiddleware, getCartController);

shopRoutes.get("/orders", isUserAuthMiddleware, getOrdersController);

shopRoutes.post("/orders", isUserAuthMiddleware, postOrdersController);

shopRoutes.get(
  "/order-overview/:orderId",
  isUserAuthMiddleware,
  getOrderOverviewController
);

shopRoutes.get("/product-details/:id", getProductDetailsController);

shopRoutes.get("/", getProductListController);

module.exports = shopRoutes; //? a valid middleware
