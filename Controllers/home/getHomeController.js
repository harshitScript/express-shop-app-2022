const getHomeController = (req, res, next) => {
  return res.render("home/home", {
    docTitle: "Home",
    docFooter: "Home page of your shop.",
    path: "/",
    noNavigation: true,
    successMessage: req.flash("success")[0],
    errorMessage: req.flash("error")[0],
  });
};

module.exports = getHomeController;
