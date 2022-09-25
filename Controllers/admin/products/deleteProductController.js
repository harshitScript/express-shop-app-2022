const Product = require("../../../Modals/product");
const { deleteFile } = require("../../../util/fileOps");
const rootDir = require("../../../util/path");
const path = require("path");

const deleteProductController = (req, res, next) => {
  const { id } = req.query;

  const successCallback = (product) => {
    deleteFile({ filePath: path.join(rootDir, product.imageURL) });

    return res.redirect("/admin/products");
  };

  const failureCallback = (error) => {
    error.httpStatusCode = 500;
    return next(error);
  };

  Product.findByIdAndDelete(id).then(successCallback).catch(failureCallback);
};

module.exports = deleteProductController;
