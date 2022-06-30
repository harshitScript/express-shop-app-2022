const getEditProductsController = (req, res, next) => {
  return res.render("admin/edit-product", {
    docTitle: "Edit Products",
    docFooter: "Edit Product of your shop.",
    path: "/admin/edit-product",
  });
};

module.exports = getEditProductsController;
