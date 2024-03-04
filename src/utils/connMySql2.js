const mysql2 = require('mysql2/promise');
require('dotenv').config();

// Connect to server
const pool = mysql2.createPool({
    host     : process.env.HOST,
    user     : process.env.USER,
    password : process.env.DB_PASSWORD,
    port     : process.env.MYSQL_PORT,
    database : process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool