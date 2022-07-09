//? database === schema

const mySQL = require("mysql2");

const pool = mySQL.createPool({
  host: "localhost",
  user: "root",
  password: "hrsht-x007",
  database: "express-first-project",
});

module.exports = pool.promise();
