const getHomeController = (req, res, next) => {
  return res.render("home/home", {
    docTitle: "Home",
    docFooter: "Home page of your shop.",
    path: "shop/home",
    noNavigation: true,
  });
};

module.exports = getHomeController;
