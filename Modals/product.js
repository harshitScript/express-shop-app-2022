const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");
const p = path.join(rootDir, "Data", "products.json");

const getProductsFromFile = (callback = () => {}) => {
  fs.readFile(p, (err, fileData) => {
    if (err) {
      return callback([]);
    }
    return callback(JSON.parse(fileData));
  });
};

module.exports = class Product {
  //? "this" keyword refer to the object to be returned by the class.

  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
    this.id = Math.random()?.toFixed(2)?.toString();
  }

  //? will be called on the instance object.
  save(callback = () => {}) {
    getProductsFromFile((products) => {
      //! "this" should always be kept within class.
      products.push(this);

      fs.writeFile(p, JSON.stringify(products), (err) => {
        if (err) return console.log("Error while saving data.");
        callback();
      });
    });
  }

  static delete(product_id, callback = () => {}) {
    getProductsFromFile((products) => {
      const updatedProducts = products.filter(
        (product) => product.id !== product_id
      );

      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (err) return console.log("Error while saving data.");
        callback();
      });
    });
  }

  edit(productId, callback = () => {}) {
    getProductsFromFile((products) => {
      let updatedProducts = products.filter(
        (product) => product.id !== productId
      );

      updatedProducts = [...updatedProducts, this];

      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (err) return console.log("Error while editing data.");
        callback();
      });
    });
  }

  //? will be called on the class itself
  static fetchAll(callback = () => {}) {
    getProductsFromFile(callback);
  }
};

//? exports = Product
//* will not work here , unknown cause.
