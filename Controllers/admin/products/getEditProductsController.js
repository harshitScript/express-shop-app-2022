const Products = require("../../../Modals/product");

const getEditProductsController = (req, res) => {
  const { id } = req.query;

  Products.findBYId(id, (product) => {
    return res.render("admin/edit-product", {
      docTitle: "Edit Products",
      docFooter: "Edit Product of your shop.",
      path: "/admin/edit-product",
      product: product,
      noNavigation: false,
    });
  });
};

module.exports = getEditProductsController;
