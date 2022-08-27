const User = require("../../Modals/User");

const authenticationChecker = (req, res, next) => {
  const { userId } = req.session;

  const failureCallback = (error) => {
    console.log("The error is: ", error);
    return next();
  };

  const successCallback = (user) => {
    req.user = user;
    req.isAuthenticated = !!userId;
    next();
  };

  User.findById(userId).then(successCallback).catch(failureCallback);
};

module.exports = authenticationChecker;
