const getHomeController = (req, res, next) => {
  return res.render("home/home", {
    docTitle: "Home",
    docFooter: "Home page of your shop.",
    path: "/",
    noNavigation: true,
    isAuthenticated: req.isAuthenticated,
  });
};

module.exports = getHomeController;
