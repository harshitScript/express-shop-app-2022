const { getDb } = require("../util/database");
const { ObjectId } = require("mongodb");

class Product {
  constructor({ title, price, imageURL, description }) {
    this.title = title;
    this.price = price;
    this.imageURL = imageURL;
    this.description = description;
  }

  save(successCallback, failureCallback) {
    const _db = getDb();
    const productsCollection = _db.collection("products");
    productsCollection
      .insertOne(this)
      .then(successCallback)
      .catch(failureCallback);
  }

  static checkDatabase() {
    return !!getDb();
  }

  static fetchAll(successCallback, failureCallback) {
    const _db = getDb();

    const productsCollection = _db.collection("products");

    //? find({}) method.
    //* It return a cursor object.
    //* Instead of returning all the document at once.
    //* We can use cursor to tell that how much documents we require at once.
    //* use toArray() method to get all the documents.

    productsCollection
      .find({
        /* title : "red light" */
      })
      .toArray()
      .then(successCallback)
      .catch(failureCallback);
  }

  static async findById(_id, successCallback, failureCallback) {
    const _db = getDb();

    const productsCollection = _db.collection("products");

    try {
      const matchedProductsArray = await productsCollection
        .find({ _id: new ObjectId(_id) })
        .next();

      successCallback(matchedProductsArray);
    } catch (err) {
      failureCallback(err);
    }
  }

  static update(
    updateProduct = {
      _id: "",
      title: "",
      price: "",
      imageURL: "",
      description: "",
    },
    successCallback,
    failureCallback
  ) {
    const _db = getDb();

    const { _id, ...tempUpdateProduct } = updateProduct;

    const productCollection = _db.collection("products");

    productCollection
      .updateOne({ _id: new ObjectId(_id) }, { $set: { ...tempUpdateProduct } })
      .then(successCallback)
      .catch(failureCallback);
  }

  static deleteById(
    _id = "",
    successCallback = () => {},
    failureCallback = () => {}
  ) {
    const _db = getDb();

    const productCollection = _db.collection("products");

    productCollection
      .deleteOne({ _id: new ObjectId(_id) })
      .then(successCallback)
      .catch(failureCallback);
  }
}

module.exports = Product;
