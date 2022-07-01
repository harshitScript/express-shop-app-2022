const Product = require("../../../Modals/product");

const getAdminProductsController = (req, res) => {
  const adminProductsListCallback = (products) => {
    return res.render("admin/products", {
      docTitle: "Admin Products",
      docFooter: "Products added by the admin.",
      path: "/admin/products",
      products,
    });
  };

  //? not to use "new" cause it indicates a instance.
  Product.fetchAll(adminProductsListCallback);
};

module.exports = getAdminProductsController;
