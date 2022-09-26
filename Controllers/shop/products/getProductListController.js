const Product = require("../../../Modals/product");

const getProductListController = (req, res, next) => {
  const { page } = req.params;

  const productsCallback = (products) => {
    return res.render("shop/product-list", {
      docTitle: "Product listing",
      products,
      docFooter: "Thanks for visiting my shop !",
      path: "/shop/",
      csrfToken: req.csrfToken(),
      noNavigation: false,
      numberOfPages: 4,
    });
  };

  const productsFailureCallback = (error) => {
    error.httpStatusCode = 500;
    return next(error);
  };

  Product.find().then(productsCallback).catch(productsFailureCallback);
};

module.exports = getProductListController;
