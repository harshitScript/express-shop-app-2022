const Product = require("../../../Modals/product");

const getAdminProductsController = (req, res) => {
  const adminProductsListCallback = (products) => {
    return res.render("admin/products", {
      docTitle: "Admin Products",
      docFooter: "Products added by the admin.",
      path: "/admin/products",
      products,
      noNavigation: false,
      isAuthenticated: req.isAuthenticated,
    });
  };

  const adminProductsListFailureCallback = (error) => {
    console.log(error.message);
    return res.redirect("/");
  };

  Product.find()
    .then(adminProductsListCallback)
    .catch(adminProductsListFailureCallback);
};

module.exports = getAdminProductsController;
