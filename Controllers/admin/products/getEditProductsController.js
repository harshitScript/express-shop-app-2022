const Product = require("../../../Modals/product");

const getEditProductsController = (req, res) => {
  const { id } = req.query;

  const successCallback = (product) => {
    return res.render("admin/edit-product", {
      docTitle: "Edit Products",
      docFooter: "Edit Product of your shop.",
      path: "/admin/edit-product",
      product: product,
      noNavigation: false,
    });
  };
  const failureCallback = (error) => {
    console.log(error.message);
  };

  Product.findById(id, successCallback, failureCallback);
};

module.exports = getEditProductsController;
