const notFoundController = (req, res) => {
  return res.status(404).render("error/404.ejs", {
    docTitle: "Page Not Found",
    docFooter: "Are you lost baby girl.",
    path: "none",
    noNavigation: false,
  });
};

module.exports = notFoundController;
