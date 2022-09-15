const Product = require("../../../Modals/product");

const getAdminProductsController = (req, res, next) => {
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
    const tempError = new Error(error?.message);
    tempError.httpStatusCode = 500;
    next(tempError);
  };

  Product.find()
    .then(adminProductsListCallback)
    .catch(adminProductsListFailureCallback);
};

module.exports = getAdminProductsController;
