const getAddProductsController = (req, res, next) => {
  return res.render("admin/add-product", {
    docTitle: "Add Products",
    docFooter: "Add Product to your shop.",
    path: "/admin/add-product",
    noNavigation: false,
    csrfToken: req.csrfToken(),
    error: req.flash("error")[0],
    success: req.flash("success")[0],
    validation_errors: req.flash("validation_error"),
    old_input: req.flash("old_input")[0] || {},
  });
};

module.exports = getAddProductsController;
