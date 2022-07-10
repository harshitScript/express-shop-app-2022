const Product = require("../../../Modals/product");

const getProductDetailsController = (req, res) => {
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
    console.log(error.message);
    return res.redirect("/");
  };

  Product.findByPk(productId).then(successCallback).catch(failureCallback);

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
