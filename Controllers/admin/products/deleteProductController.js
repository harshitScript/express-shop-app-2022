const Product = require("../../../Modals/product");
const { deleteFile } = require("../../../util/fileOps");
const rootDir = require("../../../util/path");
const path = require("path");

const deleteProductController = (req, res, next) => {
  const { product_id } = req.params;

  const successCallback = (product) => {
    deleteFile({ filePath: path.join(rootDir, product.imageURL) });
    return res.json({ message: "Deletion successful." });
  };

  const failureCallback = (error) => {
    return res.status(500).json({ message: error.message });
  };

  Product.findByIdAndDelete(product_id)
    .then(successCallback)
    .catch(failureCallback);
};

module.exports = deleteProductController;
