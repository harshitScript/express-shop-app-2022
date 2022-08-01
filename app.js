//? Third party modules
const express = require("express");

//? Core modules
const path = require("path");

//? Local imports
const { connectMongo } = require("./util/database");
const { adminRoutes } = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorRoute = require("./routes/error");
const homeRoute = require("./routes/home");
const User = require("./Modals/User");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  const failureCallback = (error) => {
    console.log("The error is: ", error);
  };

  User.findById(
    "62e80678bffeb1c4147953dc",
    (user) => {
      req.user = user;
      next();
    },
    failureCallback
  );
});

app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);
app.use(homeRoute);
app.use(errorRoute);

const databaseConnectionSuccessCallback = () => {
  app.listen(4000, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Server is running on port 4000");
    }
  });
};

const databaseConnectionFailureCallback = (error) => {
  console.log("The error is: ", error);
};

connectMongo(
  databaseConnectionSuccessCallback,
  databaseConnectionFailureCallback
);
