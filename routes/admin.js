const express = require("express");
const { body } = require("express-validator");
const csrf = require("csurf");

//? Controllers
const getAddProductsController = require("../controllers/admin/products/getAddProductsController");
const postProductsController = require("../Controllers/admin/products/postProductsController");
const getEditProductsController = require("../controllers/admin/products/getEditProductsController");
const getAdminProductsController = require("../controllers/admin/products/getAdminProductsController");
const deleteProductController = require("../controllers/admin/products/deleteProductController");
const editProductsController = require("../controllers/admin/products/editProductsController");
const isAdminAuthMiddleware = require("../Controllers/middleware/isAdminAuthMiddleware");
const { uploadProductImage } = require("../file-upload.config");

const adminRoutes = express.Router();

//* "/admin/product"
adminRoutes.post(
  "/product",
  uploadProductImage.single("image"),
  csrf(),
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
  csrf(),
  isAdminAuthMiddleware,
  getAddProductsController
);

adminRoutes.get(
  "/edit-product",
  csrf(),
  isAdminAuthMiddleware,
  getEditProductsController
);

adminRoutes.post(
  "/edit-product/:id",
  uploadProductImage.single("image"),
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

adminRoutes.delete(
  "/delete-product/:product_id",
  isAdminAuthMiddleware,
  deleteProductController
);

adminRoutes.get(
  "/products/:page",
  csrf(),
  isAdminAuthMiddleware,
  getAdminProductsController
);

module.exports = { adminRoutes }; //? a valid middleware
