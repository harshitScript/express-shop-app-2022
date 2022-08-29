const Product = require("../../../Modals/product");

const getProductListController = (req, res) => {
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
    console.log("The error is : ", error);
    return res.redirect("/");
  };

  Product.find()

    .then(productsCallback)
    .catch(productsFailureCallback);
};

module.exports = getProductListController;
