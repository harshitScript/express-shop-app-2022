//? Third party modules
const express = require("express");
const sessions = require("express-session");
const { config } = require("dotenv");
const csrf = require("csurf");
const flash = require("connect-flash");

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
const checkEnv = require("./envCheck");
const commonViewOptionsProviderMiddleware = require("./Controllers/middleware/commonViewOptionsProviderMiddleware");
const expressErrorController = require("./Controllers/error/expressErrorController");
const { urlencoded } = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

config(); //* to access the env files

//* => Request will fall down from here.

app.use(urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  sessions({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStoreCreator(sessions),
    cookie: {
      expiry: new Date().setDate(new Date().getDate + 1),
    },
  })
);
app.use(flash());
app.use(authenticationChecker);
app.use(commonViewOptionsProviderMiddleware);
app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);
app.use("/auth", authRoutes);
app.use(homeRoute);
app.use(errorRoute);
//* THIS MUST BE KEPT LAST IN THE MIDDLEWARE STACK.
app.use(expressErrorController);

//? "events" core module check
const serverStarted = new EventEmitter();

serverStarted.on("server_on", () => {
  console.log(`Express Server is running on port ${process.env.PORT}`);
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

const envFailureCallback = () => {
  console.log(".env FILE IS NOT FOUND.");
};

checkEnv()
  .then(
    connectMongoose.bind(
      null,
      databaseConnectionSuccessCallback,
      databaseConnectionFailureCallback
    )
  )
  .catch(envFailureCallback);
