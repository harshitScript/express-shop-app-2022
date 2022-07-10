//? database === schema

/* const mySQL = require("mysql2");

const pool = mySQL.createPool({
  host: "localhost",
  user: "root",
  password: "hrsht-x007",
  database: "express-first-project",
});

module.exports = pool.promise(); */

const Sequelize = require("sequelize");

//? It will set up a connection pool behind the scenes
const sequelize = new Sequelize("express-first-project", "root", "hrsht-x007", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
