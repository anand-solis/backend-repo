const sqlite3 = require("sqlite3").verbose();

const path = require("path");

const dbFilePath = path.join(__dirname, "blacklist.db");
const connectSqlDB = new sqlite3.Database(dbFilePath);

module.exports = connectSqlDB;