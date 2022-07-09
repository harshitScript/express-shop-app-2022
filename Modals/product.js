const sqlPool = require("../util/database");
const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");
const p = path.join(rootDir, "Data", "products.json");

module.exports = class Product {
  //? "this" keyword refer to the object to be returned by the class.

  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageURL = imageUrl;
    this.price = price;
    this.description = description;
  }

  //? will be called on the instance object.
  save(successCallback, failureCallback) {
    sqlPool
      .execute(
        "INSERT INTO products (title, price, description, imageURL) VALUES (?, ?, ?, ?)",
        [this.title, this.price, this.description, this.imageURL]
      )
      .then(successCallback)
      .catch(failureCallback);
  }

  static delete(product_id, callback = () => {}) {
    getProductsFromDB((products) => {
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
    getProductsFromDB((products) => {
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
  static fetchAll(successCallback, failureCallback) {
    sqlPool
      .execute(`SELECT * FROM products`)
      .then(successCallback)
      .catch(failureCallback);

    /*  return sqlPool.execute(`SELECT * FROM products`); */
  }

  static findBYId(product_id, successCallback, failureCallback) {
    sqlPool
      .execute(`SELECT * FROM products WHERE (id = ?)`, [product_id])
      .then(successCallback)
      .catch(failureCallback);
  }
};

//? exports = Product
//* will not work here , unknown cause.
