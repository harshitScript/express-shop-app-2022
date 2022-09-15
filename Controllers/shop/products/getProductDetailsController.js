const Product = require("../../../Modals/product");

const getProductDetailsController = (req, res, next) => {
  const productId = req?.params?.id;

  const successCallback = (product) => {
    return res.render("shop/product-details", {
      docTitle: `Product Details : ${product?.title}`,
      docFooter: "Your product's overview.",
      path: "/shop/product-details",
      singleProduct: product,
      noNavigation: false,
    });
  };

  const failureCallback = (error) => {
    const tempError = new Error(error?.message);
    tempError.httpStatusCode = 500;
    next(tempError);
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
