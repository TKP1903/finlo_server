require('dotenv').config();
const mysql = require("mysql");

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "rootuser@123",
//   database: "finlotax",
// });
console.log({db_key: process.env.DB_KEY});
db = mysql.createConnection({
  port: "3306",
  host: "localhost",
  user: "root",
  database: "finlo",
  // password: "9344120434Ab@",
  password: process.env.DB_KEY,
  multipleStatements: true,
  dateStrings: "Date",
});

// db.connect(function (err) {
// if (!err) {
//   console.log("Database is connected!");
//   callback(null, db);
// } else {
//   console.log("Error connecting DB...." +err);
//   callback("Error connecting database!", err);
// }
// });

module.exports = db;
