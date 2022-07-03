const getEditProductsController = (req, res) => {
  const { id } = req.params;

  return res.render("admin/edit-product", {
    docTitle: "Edit Products",
    docFooter: "Edit Product of your shop.",
    path: "/admin/edit-product",
    productId: id,
    noNavigation: false,
  });
};

module.exports = getEditProductsController;
