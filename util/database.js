const Mongoose = require("mongoose");

const connectMongoose = (successCallback, failureCallback) => {
  const connectionSuccessCallback = (client) => {
    successCallback();
  };

  Mongoose.connect(
    "mongodb+srv://harshitScript:hrsht-x007@cluster0.gjnrywi.mongodb.net/express_first_project?retryWrites=true&w=majority"
  )
    .then(connectionSuccessCallback)
    .catch(failureCallback);
};

module.exports = { connectMongoose };
