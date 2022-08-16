const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: {
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
  },
});



module.exports = mongoose.model("Order", orderSchema);

/* const { getDb } = require("../util/database");
const { stringIdToObjectId } = require("../util/helper");

class Order {
  constructor(userId = "", cart = []) {
    this.userId = userId;
    this.products = cart;
  }

  save(successCallback, failureCallback) {
    const _db = getDb();
    const ordersCollection = _db.collection("orders");
    ordersCollection
      .insertOne(this)
      .then(successCallback)
      .catch(failureCallback);
  }

  static fetchAll(successCallback, failureCallback) {
    const _db = getDb();
    const ordersCollection = _db.collection("orders");
    ordersCollection
      .find({})
      .toArray()
      .then(successCallback)
      .catch(failureCallback);
  }

  static fetchUserOrders(userId, successCallback, failureCallback) {
    const _db = getDb();
    const orderCollection = _db.collection("orders");
    orderCollection
      .find({
        userId: stringIdToObjectId(userId),
      })
      .toArray()
      .then(successCallback)
      .catch(failureCallback);
  }

  static findById(orderId, successCallback, failureCallback) {
    const _db = getDb();
    const orderCollection = _db.collection("orders");
    orderCollection
      .findOne({ _id: stringIdToObjectId(orderId) })
      .then(successCallback)
      .catch(failureCallback);
  }
}

module.exports = Order;
 */
