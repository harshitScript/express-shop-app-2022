//? Third party modules
const express = require("express");
const sessions = require("express-session");
const flash = require("connect-flash");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const { config } = require("dotenv");

//? Core modules
const path = require("path");
const EventEmitter = require("events");
const fs = require("fs");

//? Local imports
const { connectMongoose, sessionStoreCreator } = require("./util/database");
const errorRoute = require("./routes/error");
const homeRoute = require("./routes/home");
const { adminRoutes } = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const authenticationChecker = require("./Controllers/auth/authenticationChecker");
const commonViewOptionsProviderMiddleware = require("./Controllers/middleware/commonViewOptionsProviderMiddleware");
const expressErrorController = require("./Controllers/error/expressErrorController");
const { urlencoded } = require("body-parser");

const app = express();

config();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//* => Request will fall down from here.

const accessLogsStream = fs.createWriteStream(
  path.join(__dirname, "access.log")
);

app.use(helmet());
app.use(compression());
app.use(morgan("combined", { stream: accessLogsStream }));
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

connectMongoose(
  databaseConnectionSuccessCallback,
  databaseConnectionFailureCallback
);
