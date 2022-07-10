const Product = require("../../../Modals/product");

const getAdminProductsController = (req, res) => {
  const adminProductsListCallback = (products) => {
    return res.render("admin/products", {
      docTitle: "Admin Products",
      docFooter: "Products added by the admin.",
      path: "/admin/products",
      products,
      noNavigation: false,
    });
  };

  const adminProductsListFailureCallback = (error) => {
    console.log(error.message);
    return res.redirect("/");
  };

  Product.findAll({
    where: {
      //? conditions to be matched.
    },
  })
    .then(adminProductsListCallback)
    .catch(adminProductsListFailureCallback);
};

module.exports = getAdminProductsController;
