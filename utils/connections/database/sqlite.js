const connectSqlDB = require("@/utils/connections/database/connectSqlDB");

module.exports = {
    sqliteDelete: () => {
        const connectionSqlDB = connectSqlDB();

        connectionSqlDB.serialize(() => {
            const twentyFourHoursAgo = new Date();
            twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24); // Calculate the date and time 24 hours ago
    
            connectionSqlDB.run(`DELETE FROM tokens WHERE created_at < ?;`, [twentyFourHoursAgo.toISOString()]);
        })
    },

    sqliteInsert: (token) => {
        const connectionSqlDB = connectSqlDB();

        connectionSqlDB.serialize(() => {
            connectionSqlDB.run(`INSERT INTO tokens (token) VALUES (?);`, [token]);
        })
    }
};