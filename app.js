//? Third party modules
const express = require("express");

//? Core modules
const path = require("path");

//? Local imports
const { adminRoutes } = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorRoute = require("./routes/error");
const homeRoute = require("./routes/home");
const sequelizePool = require("./util/database");
const Product = require("./Modals/product");
const User = require("./Modals/user");
const Cart = require("./Modals/cart/cart");
const CartItem = require("./Modals/cart/cart-item");

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

app.use((req, res, next) => {
  User.findByPk(1, { include: "cart" })
    .then((user) => {
      //? Here "user" is a sequelize object(not a simple js object) with all the utility methods attached like save() and destroy().
      //? user.save() will update the user object in the database.
      //? user.destroy() will delete the user object from the database.

      //? adding a new property to the request object.

      req.user = user;

      if (user?.cart?.id) {
        return user?.cart;
      }

      return user.createCart();
    })
    .then((cart) => {
      next();
    })
    .catch((error) => {
      console.log("Error:", error.message);
    });
});

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

//* Relations

User.hasOne(Cart);
Cart.belongsTo(User, { onDelete: "CASCADE" });

Cart.belongsToMany(CartItem, { through: "itemsInCart" });
CartItem.belongsToMany(Cart, { through: "itemsInCart", onDelete: "CASCADE" });

Product.belongsToMany(CartItem, { through: "productsAsCartItem" });
CartItem.belongsToMany(Product, {
  through: "productsAsCartItem",
  onDelete: "CASCADE",
});

/* 

******* What's the below relation convey?
=> A cart can have multiple products.
=> A product can only be in one cart.


Cart.hasMany(Product);
Product.belongsTo(Cart, { constraints: true, onDelete: "CASCADE" }); 

*/

//? Syncing the tables/modals with the database.
//! force : true will drop the table if it already exists.(not recommended in production)
sequelizePool
  .sync(/* { force: true } */)
  .then(() => {
    return User.findByPk(1);

    //? Creates a new table when executed first time , if tables does not exist.
    //? After it will update the table if any changes are made to the model.
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "admin", email: "admin@gmail.com" });
    }

    //? whatever is returned from the then() block will be passed to the next then()
    return user;
  })
  .then((user) => {
    app.listen(4000, (err) => {
      if (err) return console.log("Error in starting server");
      console.log("Server is listening on port 4000");
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
