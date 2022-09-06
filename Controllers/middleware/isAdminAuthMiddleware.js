const isAdminAuthMiddleware = (req, res, next) => {
  const { isAuthenticated, role } = req;

  if (isAuthenticated && role === "admin") {
    return next();
  } else {
    req.flash("error", "Unauthorized action detected.");
    return res.redirect("/");
  }
};

module.exports = isAdminAuthMiddleware;
