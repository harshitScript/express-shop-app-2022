const isUserAuthMiddleware = (req, res, next) => {
  const { isAuthenticated, role } = req;
  if (isAuthenticated && role === "user") {
    return next();
  }
  return res.redirect("/auth/login");
};

module.exports = isUserAuthMiddleware;
