const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "9344120434Ab@",
  database: "finlo",
});
module.exports = db;
