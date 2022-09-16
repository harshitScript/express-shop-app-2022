const Product = require("../../../Modals/product");

const deleteProductController = (req, res, next) => {
  const { id } = req.query;

  const successCallback = () => {
    return res.redirect("/admin/products");
  };

  const failureCallback = (error) => {
    error.httpStatusCode = 500;
    return next(error);
  };

  Product.findByIdAndDelete(id).then(successCallback).catch(failureCallback);
};

module.exports = deleteProductController;
