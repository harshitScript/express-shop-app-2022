//? Third party modules
const express = require("express");

//? Core modules
const path = require("path");

//? Local imports
const { adminRoutes } = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorRoute = require("./routes/error");
const homeRoute = require("./routes/home");

const app = express();

//? Global Variables / Configuration settings for server.
app.set("view engine", "ejs"); //* built in engine.
//app.set("view engine", "pug"); //* built in engine.
/* app.engine(
  "handlebars",
  expressHbs({ layoutsDir: "/views/layouts", defaultLayout: "main-layout" })
); */ //* registering the handlebars engine(only required for non-built-in engines).
//app.set("view engine", "handlebars"); //* registering the template engine.
app.set("views", path.join(__dirname, "views")); //* registering the views directory.

//? Defining express's middleware/requestHandler.
//* Request always travel from top-to-bottom middleware.
//* The path define "The url should start with the defined path not the exact match".
//* e.g. defined path '/' should also match to '/example' , '/abc' etc."

//! This will execute for all the routes(as all routes starts with a slash "/").
/* app.use(
  "/",
  (req, res, next) => {
    next(); 
  },
  (req, res, next) => {
    
    next(); //? This will send request to next middleware i.e. "/add-products"
  }
); */

//? Incoming Request => adminRoute => shopRoute => errorRote => Response

app.use(express.static(path.join(__dirname, "public"))); //? This will serve static/public files from public folder.
app.use("/admin", adminRoutes); //? Execute First *will filter request starting with /admin route*
app.use("/shop", shopRoutes); //? Execute Second *will filter request starting with /admin route*
app.use(homeRoute);
app.use(errorRoute); //? Execute Third

//? Server
//* Express js server

/* const server = http.createServer(app);

server.listen(4000, (err) => {
  if (err)
    return console.log("Something bad happen while listening on port 4000");
  console.log("Server is listening on port 4000");
}); */

app.listen(4000, (err) => {
  if (err) return console.log("Error in starting server");
  console.log("Server is listening on port 4000");
});
