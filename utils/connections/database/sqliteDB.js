const connectSqlDB = require("@/utils/connections/database/connectSqlDB");

const sqliteDB = () => {
    connectSqlDB.serialize(() => {
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24); // Calculate the date and time 24 hours ago

        connectSqlDB.run(`DELETE FROM tokens WHERE created_at < ?;`, [twentyFourHoursAgo.toISOString()]);
    });
}

module.exports = sqliteDB;