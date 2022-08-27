//? Third party modules
const express = require("express");
const sessions = require("express-session");
const { config } = require("dotenv");

//? Core modules
const path = require("path");
const EventEmitter = require("events");

//? Local imports
const { connectMongoose, sessionStoreCreator } = require("./util/database");
const errorRoute = require("./routes/error");
const homeRoute = require("./routes/home");
const { adminRoutes } = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const authenticationChecker = require("./Controllers/auth/authenticationChecker");
const session = require("express-session");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

config(); //* to access the env files

//* => Request will fall down from here.

app.use(express.static(path.join(__dirname, "public")));
app.use(
  sessions({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStoreCreator(session),
    cookie: {
      expiry: new Date().setDate(new Date().getDate + 1),
    },
  })
);
app.use(authenticationChecker);
app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);
app.use("/auth", authRoutes);
app.use(homeRoute);
app.use(errorRoute);

//? "events" core module check
const serverStarted = new EventEmitter();

serverStarted.on("server_on", () => {
  console.log(
    `Harshit's Express Server is running on port ${process.env.PORT}`
  );
});

const databaseConnectionSuccessCallback = async () => {
  app.listen(process.env.PORT, (err) => {
    if (err) {
      console.log(err);
    } else {
      serverStarted.emit("server_on");
    }
  });
};

const databaseConnectionFailureCallback = (error) => {
  console.log("The error is: ", error);
};

connectMongoose(
  databaseConnectionSuccessCallback,
  databaseConnectionFailureCallback
);
