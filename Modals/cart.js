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

const quantityAdder = (cartData, addToCartProduct) => {
  let updatedCartData = [...cartData];

  const alreadyExistProduct = updatedCartData.find(
    (product) => product?.id === addToCartProduct?.id
  );

  if (!!alreadyExistProduct) {
    updatedCartData = updatedCartData.map((product) => {
      if (product.id === addToCartProduct.id) {
        return {
          ...product,
          quantity: product.quantity + 1,
          totalPrice: product.price * (product.quantity + 1),
        };
      }
      return product;
    });
  } else {
    updatedCartData.push({
      ...addToCartProduct,
      quantity: 1,
      totalPrice: addToCartProduct.price,
    });
  }

  return updatedCartData;
};

const quantityRemover = (cartData, product_id) => {
  let updatedCartData = [...cartData];

  const productInCartToDelete = updatedCartData.find(
    (product) => product.id === product_id
  );

  if (productInCartToDelete?.quantity > 1) {
    updatedCartData = updatedCartData.map((product) => {
      if (product.id === product_id) {
        return {
          ...product,
          quantity: product.quantity - 1,
          totalPrice: product.price * (product.quantity - 1),
        };
      }
      return product;
    });
  } else {
    updatedCartData = updatedCartData.filter(
      (product) => product.id !== product_id
    );
  }

  return updatedCartData;
};

module.exports = class Cart {
  //! we have done it in wrong manner (as a instance of cart class should define the structure of cart product in json)
  /*
      {title : "", price : "", quantity : "", id : ""} 
  */
  constructor(productId) {
    this.productId = productId;
  }

  save(callback = () => {}) {
    Products.fetchAll((products) => {
      const addToCartProduct = products.find(({ id }) => id === this.productId);

      getCartProductsFromFile((cartData) => {
        const updatedCartData = quantityAdder(cartData, addToCartProduct);

        fs.writeFile(cartDataPath, JSON.stringify(updatedCartData), (err) => {
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
      const updatedCartData = quantityRemover(cartData, product_id);

      fs.writeFile(cartDataPath, JSON.stringify(updatedCartData), (err) => {
        if (err) return console.log("Error while saving data.");
        callback();
      });
    });
  }
};
