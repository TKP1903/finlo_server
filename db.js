const mysql = require("mysql");

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "rootuser@123",
//   database: "finlotax",
// });

db = mysql.createConnection({
  port: "3306",
  host: "localhost",
  user: "root",
  database: "finlo",
  password: "9344120434Ab@",
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
