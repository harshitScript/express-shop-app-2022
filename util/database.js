const mongoDb = require("mongodb");

const MongoClient = mongoDb.MongoClient;

let _db;

const connectMongo = (successCallback, failureCallback) => {
  const connectionSuccessCallback = (client) => {
    _db = client.db("express_first_project");
    successCallback();
  };

  MongoClient.connect(
    "mongodb+srv://harshitScript:hrsht-x007@cluster0.gjnrywi.mongodb.net/express_first_project?retryWrites=true&w=majority"
  )
    .then(connectionSuccessCallback)
    .catch(failureCallback);
};

const getDb = () => {
  if (_db) {
    return _db;
  } else {
    console.log("No Database Found!");
  }
};

module.exports = { connectMongo, getDb };
