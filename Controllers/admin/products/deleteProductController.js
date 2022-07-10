const Product = require("../../../Modals/product");

const deleteProductController = (req, res) => {
  const { id } = req.query;

  const successCallback = () => {
    return res.redirect("/admin/products");
  };

  const failureCallback = (error) => {
    console.log(error.message);
  };

  Product.destroy({
    where: {
      id,
    },
  })
    .then(successCallback)
    .catch(failureCallback);
};

module.exports = deleteProductController;
