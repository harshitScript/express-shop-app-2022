const Products = require("../../../Modals/product");

const getProductDetailsController = (req, res) => {
  const productId = req?.params?.id;

  const successCallback = ([productArray]) => {
    const [product] = productArray;

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

  Products.findBYId(productId, successCallback, failureCallback);
};

module.exports = getProductDetailsController;
