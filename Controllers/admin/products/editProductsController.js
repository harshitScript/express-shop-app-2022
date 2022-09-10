const Product = require("../../../Modals/product");
const { validationResult } = require("express-validator");

const editProductsController = (req, res) => {
  const { id } = req.params;
  const { title, price, imageURL, description } = req.body;

  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    req.flash("validation_error", validationErrors?.errors);
    req.flash("old_input", { title, price, imageURL, description, _id: id });
    return res.redirect(`/admin/edit-product?id=${id}`);
  }

  const updateProduct = {
    title,
    price,
    imageURL,
    description,
  };

  const failureCallback = (error) => {
    console.log("The error is : ", error.message);
  };

  const successCallback = () => {
    return res.redirect("/admin/products");
  };

  Product.findByIdAndUpdate(id, updateProduct)
    .then(successCallback)
    .catch(failureCallback);
};

module.exports = editProductsController;
