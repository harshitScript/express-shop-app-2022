const mongoose = require("mongoose");
const { objectIdToStringId } = require("../util/helper");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: [
      {
        product_id: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    required: true,
  },
  orderIds: {
    type: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    required: true,
  },
  ordersPlaced: {
    type: Number,
    required: true,
  },
});

//? non static method(called on instance) -------------------------------------------
userSchema.methods.addToCart = function (product_id = "") {
  //* Here the this refers to the user object on which the method is called.

  const productPresentInCartIndex = this.cart.findIndex(
    (rawObj) => objectIdToStringId(rawObj.product_id) === product_id
  );

  let updatedCart = [];

  if (productPresentInCartIndex >= 0) {
    updatedCart = this.cart.map((rawObj) => {
      if (rawObj?.product_id == product_id) {
        return {
          ...rawObj,
          quantity: rawObj?.quantity + 1,
        };
      }
      return rawObj;
    });
  } else {
    updatedCart = [...this.cart, { product_id: product_id, quantity: 1 }];
  }

  this.cart = updatedCart;

  return this.save();
};

userSchema.methods.removeFromCart = function (product_id = "") {
  //* Here the this refers to the user object on which the method is called.

  const productPresentInCartIndex = this.cart.findIndex(
    (rawObj) => objectIdToStringId(rawObj.product_id) === product_id
  );

  let updatedCart = [];

  if (productPresentInCartIndex >= 0) {
    updatedCart = this.cart.map((rawObj) => {
      if (rawObj?.product_id == product_id) {
        return {
          ...rawObj,
          quantity: rawObj?.quantity - 1,
        };
      }
      return rawObj;
    });

    updatedCart = updatedCart.filter((rawObj) => rawObj?.quantity);
  }

  this.cart = updatedCart;

  return this.save();
};

userSchema.methods.getCart = function (successCallback, failureCallback) {
  const cartDataMaker = (userWithPopulatedProductId) => {
    return userWithPopulatedProductId?.cart?.map((rawObj) => ({
      ...rawObj?.product_id?._doc,
      quantity: rawObj?.quantity,
    }));
  };

  this.populate("cart.product_id")
    .then(cartDataMaker)
    .then(successCallback)
    .catch(failureCallback);
};

userSchema.methods.clearCart = function () {
  this.cart = [];
  return this.save();
};

userSchema.methods.orderIdsUpdater = function (newOrderResponse = {}) {
  this.orderIds = [...this.orderIds, newOrderResponse?._id];
  this.ordersPlaced = this.ordersPlaced + 1;
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
