const Product = require("../../../Modals/product");

const getProductListController = (req, res, next) => {
  const { page } = req.params;

  let totalProducts = 0;

  const productsCallback = (products) => {
    return res.render("shop/product-list", {
      docTitle: "Product listing",
      products,
      docFooter: "Thanks for visiting my shop !",
      path: "/shop/",
      csrfToken: req.csrfToken(),
      noNavigation: false,
      numberOfPages: Math.ceil(totalProducts / process.env.ITEMS_PER_PAGE),
    });
  };

  const countCallback = (count) => {
    totalProducts = count;
    return Product.find()
      .skip((page - 1) * process.env.ITEMS_PER_PAGE)
      .limit(2);
  };

  const productsFailureCallback = (error) => {
    error.httpStatusCode = 500;
    return next(error);
  };

  Product.find()
    .countDocuments()
    .then(countCallback)
    .then(productsCallback)
    .catch(productsFailureCallback);
};

module.exports = getProductListController;
