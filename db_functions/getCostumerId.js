
const db = require("../db");
const { db_query } = require("./db_query");

const getCostumerIdFromUserId = async (user_id) => {
    // search in customers database to find the customer_id (id)
    const q = "SELECT id FROM customers WHERE user_id = (?)";
    const rows = await db_query(q, [user_id]);
    return rows[0].id;
};

module.exports = {
    getCostumerIdFromUserId,
};