const express = require("express");
const bodyParser = require("body-parser");

//? Controllers
const getAddProductsController = require("../controllers/admin/products/getAddProductsController");
const postProductsController = require("../Controllers/admin/products/postProductsController");
const getEditProductsController = require("../controllers/admin/products/getEditProductsController");
const getAdminProductsController = require("../controllers/admin/products/getAdminProductsController");
const deleteProductController = require("../controllers/admin/products/deleteProductController");
const editProductsController = require("../controllers/admin/products/editProductsController");
const isAuthMiddleware = require("../Controllers/middleware/isAuthMiddleware");

const adminRoutes = express.Router();

//* "/admin/product"
adminRoutes.post(
  "/product",
  bodyParser.urlencoded({ extended: false }),
  isAuthMiddleware,
  postProductsController.middleWare
);

//* "/admin/add-product"
adminRoutes.get("/add-product", isAuthMiddleware, getAddProductsController);

adminRoutes.get("/edit-product", isAuthMiddleware, getEditProductsController);

adminRoutes.post(
  "/edit-product/:id",
  bodyParser.urlencoded({ extended: false }),
  isAuthMiddleware,
  editProductsController
);

adminRoutes.get("/delete-product", isAuthMiddleware, deleteProductController);

adminRoutes.get("/products", isAuthMiddleware, getAdminProductsController);

module.exports = { adminRoutes }; //? a valid middleware
