const Product = require("../../../Modals/product");

const getAdminProductsController = (req, res, next) => {
  const { page } = req.params;

  global.console.log("The page number =>", page);

  const adminProductsListCallback = (products) => {
    return res.render("admin/products", {
      docTitle: "Admin Products",
      docFooter: "Products added by the admin.",
      path: "/admin/products",
      products,
      csrfToken: req.csrfToken(),
      noNavigation: false,
      isAuthenticated: req.isAuthenticated,
      numberOfPages: 4,
    });
  };

  const adminProductsListFailureCallback = (error) => {
    error.httpStatusCode = 500;
    return next(error);
  };

  Product.find()
    .then(adminProductsListCallback)
    .catch(adminProductsListFailureCallback);
};

module.exports = getAdminProductsController;
