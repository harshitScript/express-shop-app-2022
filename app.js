//? Third party modules
const express = require("express");
const cookieParser = require("cookie-parser");

//? Core modules
const path = require("path");
const EventEmitter = require("events");

//? Local imports
const { connectMongoose } = require("./util/database");
const errorRoute = require("./routes/error");
const homeRoute = require("./routes/home");
const { adminRoutes } = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const User = require("./Modals/User");
const authRoutes = require("./routes/auth");
const authenticationChecker = require("./Controllers/auth/authenticationChecker");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//* => Request will fall down from here.

app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser(), authenticationChecker);
app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);
app.use("/auth", authRoutes);
app.use(homeRoute);
app.use(errorRoute);

//? "events" core module check
const serverStarted = new EventEmitter();

serverStarted.on("server_on", () => {
  console.log("Harshit's Express Server is running on port 4000");
});

const databaseConnectionSuccessCallback = async () => {
  const user = await User.findOne();

  if (!user) {
    new User({
      email: "admin@gmail.com",
      name: "admin",
      cart: [],
      orderIds: [],
      ordersPlaced: 0,
    }).save();
  } else {
    app.listen(4000, (err) => {
      if (err) {
        console.log(err);
      } else {
        serverStarted.emit("server_on");
      }
    });
  }
};

const databaseConnectionFailureCallback = (error) => {
  console.log("The error is: ", error);
};

connectMongoose(
  databaseConnectionSuccessCallback,
  databaseConnectionFailureCallback
);
