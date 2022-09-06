const User = require("../../Modals/User");

const authenticationChecker = (req, res, next) => {
  const { userId } = req.session;

  const failureCallback = (error) => {
    console.log("The error is: ", error);
    return next();
  };

  const successCallback = (user) => {
    if (!user) {
      req.isAuthenticated = false;
      return next();
    }
    req.user = user;
    req.isAuthenticated = true;
    req.role = user.role;
    return next();
  };

  User.findById(userId).then(successCallback).catch(failureCallback);
};

module.exports = authenticationChecker;
