const sqlite3 = require("sqlite3").verbose();

const connectSqlDB = () => {
    const connectionSqlDB = new sqlite3.Database("./blacklist.db");

    connectionSqlDB.serialize(() => {
        connectionSqlDB.run(`CREATE TABLE IF NOT EXISTS tokens (token TEXT PRIMARY KEY, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);`);
    });

    return connectionSqlDB;
}

module.exports = connectSqlDB;