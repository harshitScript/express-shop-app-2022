const { getDb } = require("../util/database");
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
