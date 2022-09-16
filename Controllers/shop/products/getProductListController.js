const Product = require("../../../Modals/product");

const getProductListController = (req, res, next) => {
  const productsCallback = (products) => {
    return res.render("shop/product-list", {
      docTitle: "Product listing",
      products,
      docFooter: "Thanks for visiting my shop !",
      path: "/shop/",
      noNavigation: false,
    });
  };

  const productsFailureCallback = (error) => {
    error.httpStatusCode = 500;
    return next(error);
  };

  Product.find().then(productsCallback).catch(productsFailureCallback);
};

module.exports = getProductListController;
