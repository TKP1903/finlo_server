const {db_query} = require('./db_query');
const {getLastInsertId} = require('./getLastInsertId');
const {getCostumerIdFromUserId} = require('./getCostumerId');

module.exports = {
    db_query,
    getLastInsertId,
    getCostumerIdFromUserId,
};
// Path: db_functions\index.js