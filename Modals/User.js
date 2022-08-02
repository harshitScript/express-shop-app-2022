const { objectIdToStringId, stringIdToObjectId } = require("../util/helper");
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
        _id: stringIdToObjectId(_id),
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
        (product) =>
          objectIdToStringId(product._id) === objectIdToStringId(productId)
      );

      const productAlreadyInCart = tempCart.find(
        (product) =>
          objectIdToStringId(product._id) === objectIdToStringId(productId)
      );

      if (!!productAlreadyInCart) {
        tempCart = tempCart.map((product, index) => {
          if (index === productIndex) {
            return {
              ...product,
              quantity: product.quantity + 1,
            };
          } else {
            return product;
          }
        });

        return userCollection.updateOne(
          { _id: stringIdToObjectId(userId) },
          { $set: { cart: tempCart } }
        );
      } else {
        tempCart = [
          ...tempCart,
          { _id: stringIdToObjectId(productId), quantity: 1 },
        ];

        return userCollection.updateOne(
          { _id: stringIdToObjectId(userId) },
          { $set: { cart: tempCart } }
        );
      }
    };

    const _db = getDb();
    const userCollection = _db.collection("users");
    userCollection
      .findOne({ _id: stringIdToObjectId(userId) })
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
        (product) =>
          objectIdToStringId(product._id) === objectIdToStringId(productId)
      );

      if (productIndex >= 0) {
        tempCart = tempCart.map((product, index) => {
          if (index === productIndex) {
            return {
              ...product,
              quantity: product.quantity - 1,
            };
          } else {
            return product;
          }
        });

        tempCart = tempCart.filter((product) => product.quantity > 0);

        return userCollection.updateOne(
          { _id: stringIdToObjectId(userId) },
          { $set: { cart: tempCart } }
        );
      }
    };

    const _db = getDb();
    const userCollection = _db.collection("users");
    userCollection
      .findOne({ _id: stringIdToObjectId(userId) })
      .then(quantitySubtractOrProductRemover)
      .then(successCallback)
      .catch(failureCallback);
  }
}

module.exports = User;
