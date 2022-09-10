const Product = require("../../../Modals/product");
const { validationResult } = require("express-validator");

const postProductsController = (req, res) => {
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
    console.log(error.message);
    return res.redirect("/");
  };

  const product = new Product({ title, price, description, imageURL });

  product.save().then(successCallback).catch(failureCallback);
};

module.exports = { middleWare: postProductsController };
