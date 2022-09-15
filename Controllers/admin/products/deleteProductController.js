const Product = require("../../../Modals/product");

const deleteProductController = (req, res, next) => {
  const { id } = req.query;

  const successCallback = () => {
    return res.redirect("/admin/products");
  };

  const failureCallback = (error) => {
    const tempError = new Error(error?.message);
    tempError.httpStatusCode = 500;
    next(tempError);
  };

  Product.findByIdAndDelete(id).then(successCallback).catch(failureCallback);
};

module.exports = deleteProductController;
