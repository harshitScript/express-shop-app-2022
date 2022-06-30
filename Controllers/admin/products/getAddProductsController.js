const getAddProductsController = (req, res, next) => {
  return res.render("admin/add-product", {
    docTitle: "Add Products",
    docFooter: "Add Product to your shop.",
    path: "/admin/add-product",
  });
};

module.exports = getAddProductsController;
