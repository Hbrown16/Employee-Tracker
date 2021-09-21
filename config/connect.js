require('dotenv').config();
const {createConnection} = require('mysql')

const connection = createConnection({
    host: 'localhost',

    PORT: 3306,

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// export default mysql;
// export default connection;
module.exports = connection;