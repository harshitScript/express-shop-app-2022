const express = require("express");
const bodyParser = require("body-parser");

//? Controllers
const getAddProductsController = require("../controllers/admin/products/getAddProductsController");
const postProductsController = require("../Controllers/admin/products/postProductsController");
const getEditProductsController = require("../controllers/admin/products/getEditProductsController");
const getAdminProductsController = require("../controllers/admin/products/getAdminProductsController");
const deleteProductController = require("../controllers/admin/products/deleteProductController");
const editProductsController = require("../controllers/admin/products/editProductsController");
const isAdminAuthMiddleware = require("../Controllers/middleware/isAdminAuthMiddleware");

const adminRoutes = express.Router();

//* "/admin/product"
adminRoutes.post(
  "/product",
  bodyParser.urlencoded({ extended: false }),
  isAdminAuthMiddleware,
  postProductsController.middleWare
);

//* "/admin/add-product"
adminRoutes.get(
  "/add-product",
  isAdminAuthMiddleware,
  getAddProductsController
);

adminRoutes.get(
  "/edit-product",
  isAdminAuthMiddleware,
  getEditProductsController
);

adminRoutes.post(
  "/edit-product/:id",
  bodyParser.urlencoded({ extended: false }),
  isAdminAuthMiddleware,
  editProductsController
);

adminRoutes.get(
  "/delete-product",
  isAdminAuthMiddleware,
  deleteProductController
);

adminRoutes.get("/products", isAdminAuthMiddleware, getAdminProductsController);

module.exports = { adminRoutes }; //? a valid middleware
