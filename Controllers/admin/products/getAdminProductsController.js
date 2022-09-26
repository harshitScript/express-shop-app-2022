const Product = require("../../../Modals/product");

const getAdminProductsController = (req, res, next) => {
  const { page } = req.params;

  let totalProducts = 0;

  const adminProductsListCallback = (products) => {
    return res.render("admin/products", {
      docTitle: "Admin Products",
      docFooter: "Products added by the admin.",
      path: "/admin/products",
      products,
      csrfToken: req.csrfToken(),
      noNavigation: false,
      isAuthenticated: req.isAuthenticated,
      numberOfPages: Math.ceil(totalProducts / process.env.ITEMS_PER_PAGE),
    });
  };

  const countCallback = (count) => {
    totalProducts = count;
    return Product.find()
      .skip((page - 1) * process.env.ITEMS_PER_PAGE)
      .limit(2);
  };

  const adminProductsListFailureCallback = (error) => {
    error.httpStatusCode = 500;
    return next(error);
  };

  Product.find()
    .countDocuments()
    .then(countCallback)
    .then(adminProductsListCallback)
    .catch(adminProductsListFailureCallback);
};

module.exports = getAdminProductsController;
