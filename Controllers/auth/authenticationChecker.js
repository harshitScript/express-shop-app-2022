const User = require("../../Modals/User");

const authenticationChecker = (req, res, next) => {
  const { userId } = req.cookies;

  const failureCallback = (error) => {
    console.log("The error is: ", error);
  };

  const successCallback = (user) => {
    req.user = user;
    req.isAuthenticated = !!userId;
    next();
  };

  User.findById(userId).then(successCallback).catch(failureCallback);
};

module.exports = authenticationChecker;
