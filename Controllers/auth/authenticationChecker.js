const User = require("../../Modals/User");

const authenticationChecker = (req, res, next) => {
  const { userId } = req.session;

  const failureCallback = () => {
    return res.status(500).render("error/500.ejs", {
      docTitle: "Server down",
      docFooter: "Server is not in mood.",
      path: "none",
      noNavigation: false,
    });

    //? This might cause a loop of redirection(as redirection is done by browser)
    //! return res.redirect("/server-error");
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
