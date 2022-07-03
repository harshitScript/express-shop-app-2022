const Products = require("./product");
const fs = require("fs");
const rootDir = require("../util/path");
const path = require("path");
const cartDataPath = path.join(rootDir, "Data", "cart.json");

const getCartProductsFromFile = (callback = () => {}) => {
  fs.readFile(cartDataPath, (err, fileData) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(fileData));
    }
  });
};

module.exports = class Cart {
  constructor(productId) {
    this.productId = productId;
  }

  save(callback = () => {}) {
    Products.fetchAll((products) => {
      const addToCartProduct = products.find(({ id }) => id === this.productId);

      getCartProductsFromFile((cartData) => {
        cartData.push(addToCartProduct);

        fs.writeFile(cartDataPath, JSON.stringify(cartData), (err) => {
          if (err) return console.log("Error while saving data.");
          callback();
        });
      });
    });
  }

  static fetchAll(callback = () => {}) {
    getCartProductsFromFile(callback);
  }

  static delete(product_id, callback = () => {}) {
    getCartProductsFromFile((cartData) => {
      const updatedCart = cartData.filter(
        (product) => product.id !== product_id
      );

      fs.writeFile(cartDataPath, JSON.stringify(updatedCart), (err) => {
        if (err) return console.log("Error while saving data.");
        callback();
      });
    });
  }
};
