const commonViewOptionsProviderMiddleware = (req, res, next) => {
  //? A functionality that passes the common options to all the view render function.
  res.locals.isAuthenticated = req.isAuthenticated;
  res.locals.csrfToken = req.csrfToken();
  next();
};

module.exports = commonViewOptionsProviderMiddleware;
