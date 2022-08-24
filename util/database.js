const Mongoose = require("mongoose");
const mongoDbStoreCreator = require("connect-mongodb-session");

const MONGO_URI =
  "mongodb+srv://harshitScript:hrsht-x007@cluster0.gjnrywi.mongodb.net/express_first_project";

const connectMongoose = (successCallback, failureCallback) => {
  const connectionSuccessCallback = (client) => {
    successCallback();
  };

  Mongoose.connect(MONGO_URI)
    .then(connectionSuccessCallback)
    .catch(failureCallback);
};

const sessionStoreCreator = (session) => {
  const MongoDbStore = mongoDbStoreCreator(session);

  const sessionStore = new MongoDbStore({
    uri: MONGO_URI,
    collection: "sessions",
    databaseName: "express_first_project",
  });

  sessionStore.on("error", () => {
    console.log("Error generating the session store.");
  });

  return sessionStore;
};

module.exports = { connectMongoose, sessionStoreCreator };
