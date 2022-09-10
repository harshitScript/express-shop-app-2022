const express = require("express");
const bodyParser = require("body-parser");
const { body } = require("express-validator");

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
  [
    body("title")
      .trim()
      .isLength({ min: 3, max: 25 })
      .withMessage("Title must be in between 3-25 characters."),
    body("imageURL")
      .trim()
      .isLength({ max: 250 })
      .withMessage("Url be less than 250 character."),
    body("price").trim().isNumeric().withMessage("Price must be in Number"),
    body("description")
      .trim()
      .isLength({ min: 5, max: 250 })
      .withMessage("Description must be in between 5-250 characters."),
  ],
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
  [
    body("title")
      .trim()
      .isLength({ min: 3, max: 25 })
      .withMessage("Title must be in between 3-25 characters."),
    body("imageURL")
      .trim()
      .isLength({ max: 250 })
      .withMessage("Url be less than 250 character."),
    body("price").trim().isNumeric().withMessage("Price must be in Number"),
    body("description")
      .trim()
      .isLength({ min: 5, max: 250 })
      .withMessage("Description must be in between 5-250 characters."),
  ],
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
