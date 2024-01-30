const connectSqlDB = require("@/utils/connections/database/connectSqlDB");
const fs = require("fs");
const path = require("path");

module.exports = {
    sqlite: () => connectSqlDB.serialize(() => {
        const dbFilePath = path.join(__dirname, "utils/connections/database/blacklist.db");

        if (!fs.existsSync(dbFilePath)) {
            fs.appendFile(dbFilePath);
            connectSqlDB.run(`CREATE TABLE tokens(token TEXT PRIMARY KEY, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);`,);
        }
    }),

    sqliteDelete: () => connectSqlDB.serialize(() => {
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24); // Calculate the date and time 24 hours ago

        connectSqlDB.run(`DELETE FROM tokens WHERE created_at < ?;`, [twentyFourHoursAgo.toISOString()]);
    }),

    sqliteInsert: (token) => connectSqlDB.serialize(() => {
        connectSqlDB.run(`INSERT INTO tokens (token) VALUES (?);`, [token]);
    })
};