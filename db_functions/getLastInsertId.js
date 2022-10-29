const { db_query } = require("./db_query");

const getLastInsertId = async () => {
    const q = "SELECT LAST_INSERT_ID()";
    const rows = await db_query(q);
    return rows[0].id;
};

module.exports = {
    getLastInsertId,
};