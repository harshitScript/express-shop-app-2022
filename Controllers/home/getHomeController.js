const getHomeController = (req, res, next) => {
  return res.render("home/home", {
    docTitle: "Home",
    docFooter: "Home page of your shop.",
    path: "/",
    noNavigation: true,
    successMessage: req.flash("success"),
  });
};

module.exports = getHomeController;
