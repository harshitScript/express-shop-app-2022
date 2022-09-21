const Product = require("../../../Modals/product");

const getProductDetailsController = (req, res, next) => {
  const productId = req?.params?.id;

  const successCallback = (product) => {
    return res.render("shop/product-details", {
      docTitle: `Product Details : ${product?.title}`,
      docFooter: "Your product's overview.",
      path: "/shop/product-details",
      singleProduct: product,
      csrfToken: req.csrfToken(),
      noNavigation: false,
    });
  };

  const failureCallback = (error) => {
    error.httpStatusCode = 500;
    return next(error);
  };

  //* These methods converts string id into object id automatically.
  Product.findById(productId).then(successCallback).catch(failureCallback);

  //! It can also be used
  /* Product.findAll({
    where: {
      id: productId,
    },
  })
    .then(([product]) => {
      console.log("The product is: ", product);
    })
    .catch((error) => {}); */
};

module.exports = getProductDetailsController;
