const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.cart = [];
    this.orders = [];
  }

  save(successCallback, failureCallback) {
    const _db = getDb();
    const usersCollection = _db.collection("users");
    usersCollection
      .insertOne(this)
      .then(successCallback)
      .catch(failureCallback);
  }

  static fetchAll(successCallback, failureCallback) {
    const _db = getDb();

    const usersCollection = _db.collection("users");

    usersCollection
      .find({})
      .toArray()
      .then(successCallback)
      .catch(failureCallback);
  }

  static async findById(_id, successCallback, failureCallback) {
    const _db = getDb();

    const usersCollection = _db.collection("users");

    try {
      const matchedUser = await usersCollection.findOne({
        _id: new ObjectId(_id),
      });

      successCallback(matchedUser);
    } catch (err) {
      failureCallback(err);
    }
  }

  static addProductToCart(
    userId = "",
    productId = "",
    successCallback = () => {},
    failureCallback = () => {}
  ) {
    const quantityAddOrProductAdder = ({ cart }) => {
      let tempCart = [...cart];

      const productIndex = tempCart.findIndex(
        (product) => product._id === productId
      );

      const productAlreadyInCart = tempCart.find(
        (product) => product._id === productId
      );

      if (!!productAlreadyInCart) {
        tempCart.at(productIndex).quantity =
          tempCart.at(productIndex)?.quantity + 1;

        return userCollection.updateOne(
          { _id: new ObjectId(userId) },
          { $set: { cart: tempCart } }
        );
      } else {
        tempCart = [...tempCart, { _id: new ObjectId(productId), quantity: 1 }];

        return userCollection.updateOne(
          { _id: new ObjectId(userId) },
          { $set: { cart: tempCart } }
        );
      }
    };

    const _db = getDb();
    const userCollection = _db.collection("users");
    userCollection
      .findOne({ _id: new ObjectId(userId) })
      .then(quantityAddOrProductAdder)
      .then(successCallback)
      .catch(failureCallback);
  }

  static removeProductFromCart(
    userId = "",
    productId = "",
    successCallback = () => {},
    failureCallback = () => {}
  ) {
    const quantitySubtractOrProductRemover = ({ cart }) => {
      let tempCart = [...cart];

      const productIndex = tempCart.findIndex(
        (product) => product._id === productId
      );

      if (!!productIndex) {
        tempCart.at(productIndex).quantity =
          tempCart.at(productIndex)?.quantity - 1;

        tempCart = tempCart.filter((product) => product.quantity > 0);

        return userCollection.updateOne(
          { _id: new ObjectId(userId) },
          { $set: { cart: tempCart } }
        );
      }
    };

    const _db = getDb();
    const userCollection = _db.collection("users");
    cartCollection
      .findOne({ _id: new ObjectId(userId) })
      .then(quantitySubtractOrProductRemover)
      .then(successCallback)
      .catch(failureCallback);
  }
}

module.exports = User;
