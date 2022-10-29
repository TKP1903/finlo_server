const db = require("../db");
const util = require("util");

const db_query = util.promisify(db.query).bind(db);

module.exports = { db_query };