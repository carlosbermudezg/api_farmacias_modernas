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

// Connect to server
const pool_sheyla = mysql2.createPool({
    host     : process.env.HOST_SHEYLA,
    user     : process.env.USER_SHEYLA,
    password : process.env.DB_PASSWORD_SHEYLA,
    port     : process.env.MYSQL_PORT_SHEYLA,
    database : process.env.DB_NAME_SHEYLA,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = { pool, pool_sheyla }