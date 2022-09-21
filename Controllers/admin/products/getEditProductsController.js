const Product = require("../../../Modals/product");

const getEditProductsController = (req, res, next) => {
  const { id } = req.query;

  const successCallback = (product) => {
    return res.render("admin/edit-product", {
      docTitle: "Edit Products",
      docFooter: "Edit Product of your shop.",
      path: "/admin/edit-product",
      product: product,
      noNavigation: false,
      csrfToken: req.csrfToken(),
      error: req.flash("error")[0],
      success: req.flash("success")[0],
      validation_errors: req.flash("validation_error"),
      old_input: req.flash("old_input")[0] || {},
    });
  };

  const failureCallback = (error) => {
    error.httpStatusCode = 500;
    return next(error);
  };

  Product.findById(id).then(successCallback).catch(failureCallback);
};

module.exports = getEditProductsController;
