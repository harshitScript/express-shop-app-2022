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
    return res.redirect("/");
  };

  //? This will fetch all the products from the Product modal.
  Product.find().then(productsCallback).catch(productsFailureCallback);

  /* res.writeHead(302, "Redirection", { location: "/message" });
        return res.end(); */
};

module.exports = getProductListController;
