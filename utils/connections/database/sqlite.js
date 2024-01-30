const connectSqlDB = require("@/utils/connections/database/connectSqlDB");

module.exports = {
    sqliteDelete: () => connectSqlDB.serialize(() => {
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24); // Calculate the date and time 24 hours ago

        connectSqlDB.run(`DELETE FROM tokens WHERE created_at < ?;`, [twentyFourHoursAgo.toISOString()]);
    }),

    sqliteInsert: (token) => connectSqlDB.serialize(() => {
        connectSqlDB.run(`INSERT INTO tokens (token) VALUES (?);`, [token]);
    })
};