const getAdminProductsController = (req, res, next) => {
  return res.render("admin/products", {
    docTitle: "Admin Products",
    docFooter: "Products added by the admin.",
    path: "/admin/products",
  });
};

module.exports = getAdminProductsController;
