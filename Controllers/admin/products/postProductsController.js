const Product = require("../../../Modals/product");
const { validationResult } = require("express-validator");

const postProductsController = (req, res, next) => {
  const { title, price, description, imageURL } = req.body;

  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    req.flash("validation_error", validationErrors?.errors);
    req.flash("old_input", { title, price, description, imageURL });
    return res.redirect("/admin/add-product");
  }

  const successCallback = () => {
    return res.redirect("/admin/products");
  };

  const failureCallback = (error) => {
    const tempError = new Error(error?.message);
    tempError.httpStatusCode = 500;
    next(tempError);
  };

  const product = new Product({ title, price, description, imageURL });

  product.save().then(successCallback).catch(failureCallback);
};

module.exports = { middleWare: postProductsController };
