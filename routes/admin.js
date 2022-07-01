const express = require("express");
const bodyParser = require("body-parser");

//? Controllers
const getAddProductsController = require("../controllers/admin/products/getAddProductsController");
const postProductsController = require("../Controllers/admin/products/postProductsController");
const getEditProductsController = require("../controllers/admin/products/getEditProductsController");
const getAdminProductsController = require("../controllers/admin/products/getAdminProductsController");
const deleteProductController = require("../controllers/admin/products/deleteProductController");
const editProductsController = require("../controllers/admin/products/editProductsController");

const adminRoutes = express.Router();

//? Now they will act as the sub-paths of the "/admin" path.

//? The bodyParser.urlencoded({ extended: false }) supply an middleware that handles all the parsing and made available request data in res.body.

//* "/admin/product"
adminRoutes.post(
  "/product",
  bodyParser.urlencoded({ extended: false }),
  postProductsController.middleWare
); //? Limit the middleware to only POST request.

//* "/admin/add-product"
adminRoutes.get(
  "/add-product",
  (req, res, next) => {
    next();
  },
  getAddProductsController
);

adminRoutes.get("/edit-product/:id", getEditProductsController);

adminRoutes.post(
  "/edit-product/:id",
  bodyParser.urlencoded({ extended: false }),
  editProductsController
);

adminRoutes.get("/products", getAdminProductsController);

adminRoutes.get("/delete-product/:id", deleteProductController);

module.exports = { adminRoutes }; //? a valid middleware
