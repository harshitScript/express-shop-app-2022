const express = require("express");
const { urlencoded, raw } = require("body-parser");
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
const getOrderInvoiceController = require("../Controllers/shop/order/getOrderInvoiceController");
const getCheckoutController = require("../Controllers/shop/checkout/getCheckoutController");
const getPaymentsPageController = require("../Controllers/shop/checkout/getPaymentsPageController");
const getPaymentsSuccessController = require("../Controllers/shop/checkout/getPaymentsSuccessController");
const getPaymentsCancelController = require("../Controllers/shop/checkout/getPaymentsCancelController");
const postStripePaymentWebhookController = require("../Controllers/shop/checkout/postStripePaymentWebhookController");

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

shopRoutes.get("/cart", csrf(), isUserAuthMiddleware, getCartController);

shopRoutes.get(
  "/checkout",
  csrf(),
  isUserAuthMiddleware,
  getCheckoutController
);

shopRoutes.get("/payments", isUserAuthMiddleware, getPaymentsPageController);

shopRoutes.get(
  "/payment-success",
  isUserAuthMiddleware,
  getPaymentsSuccessController
);

shopRoutes.get(
  "/payment-cancel",
  isUserAuthMiddleware,
  getPaymentsCancelController
);

//! Register the stripe webhook after deployment of the application.
shopRoutes.post(
  "/webhook",
  raw({ type: "application/json" }),
  postStripePaymentWebhookController
);

shopRoutes.get("/orders", csrf(), isUserAuthMiddleware, getOrdersController);

shopRoutes.post("/orders", csrf(), isUserAuthMiddleware, postOrdersController);

shopRoutes.get(
  "/order-overview/:orderId",
  isUserAuthMiddleware,
  getOrderOverviewController
);

shopRoutes.get(
  "/order-invoice/:orderId",
  isUserAuthMiddleware,
  getOrderInvoiceController
);

shopRoutes.get("/product-details/:id", csrf(), getProductDetailsController);

shopRoutes.get("/:page", csrf(), getProductListController);

module.exports = shopRoutes; //? a valid middleware
