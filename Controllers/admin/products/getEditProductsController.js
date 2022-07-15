const getEditProductsController = (req, res) => {
  const { id } = req.query;

  const successCallback = ([product]) => {
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

  Product.findByPk(id).then(successCallback).catch(failureCallback);
};

module.exports = getEditProductsController;
