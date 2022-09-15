const serverErrorController = (req, res) => {
  return res.render("error/500.ejs", {
    docTitle: "Server down",
    docFooter: "Server is not in mood.",
    path: "none",
    noNavigation: false,
  });
};

module.exports = serverErrorController;
