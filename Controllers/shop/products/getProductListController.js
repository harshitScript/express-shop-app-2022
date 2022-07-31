const Product = require("../../../Modals/product");

const getProductListController = (req, res) => {
  //? will automatically send response back to client and indicate the end of response
  //? Automatically sets the status code and headers.
  //? Although we can use the previous approach to send custom responses.
  //* __dirname is a global variable which holds the absolute path upto the current working directory i.e. "routes" here.

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
  Product.fetchAll(productsCallback, productsFailureCallback);

  /* res.writeHead(302, "Redirection", { location: "/message" });
        return res.end(); */
};

module.exports = getProductListController;
