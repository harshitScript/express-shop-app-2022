const Products = require("../../../Modals/product");

const getProductDetailsController = (req, res) => {
  const productId = req?.params?.id;

  Products.fetchAll((products) => {
    const product = products.find((product) => product.id === productId);

    return res.render("shop/product-details", {
      docTitle: `Product Details : ${product?.title}`,
      docFooter: "Your product's overview.",
      path: "/shop/product-details",
      singleProduct: product,
    });
  });
};

module.exports = getProductDetailsController;
