const getProductDetailsController = (req, res, next) => {
  return res.render("shop/product-details", {
    docTitle: "Product Details",
    docFooter: "Your product's overview.",
    path: "/shop/product-details",
  });
};

module.exports = getProductDetailsController;
