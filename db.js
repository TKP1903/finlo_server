const mysql = require("mysql");

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "rootuser@123",
//   database: "finlotax",
// });

db = mysql.createConnection({
  port: process.env.DB_PORT,
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.user,
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
