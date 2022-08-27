const Mongoose = require("mongoose");
const mongoDbStoreCreator = require("connect-mongodb-session");

const connectMongoose = (successCallback, failureCallback) => {
  const connectionSuccessCallback = () => {
    successCallback();
  };

  Mongoose.connect(process.env.MONGO_URI)
    .then(connectionSuccessCallback)
    .catch(failureCallback);
};

const sessionStoreCreator = (session) => {
  const MongoDbStore = mongoDbStoreCreator(session);

  const sessionStore = new MongoDbStore({
    uri: process.env.MONGO_URI,
    collection: "sessions",
    databaseName: "express_first_project",
  });

  sessionStore.on("error", () => {
    console.log("Error generating the session store.");
  });

  return sessionStore;
};

module.exports = { connectMongoose, sessionStoreCreator };
