require('dotenv').config();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: process.env.user,

    password: process.env.password,
    database: process.env.database,
});

module.exports = mysql;
module.exports = connection;