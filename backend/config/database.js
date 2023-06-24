// const mysql = require("mysql2/promise");

// const pool = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "123456",
//     // database: "gentle_v1",
//     database: "gentle_v1",
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
// });

// module.exports = pool;

// Deployment
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "gentle-database-v1-do-user-14273017-0.b.db.ondigitalocean.com",
    user: "doadmin",
    password: "AVNS_4gvS8U6Kd8vfRVpPhUW",
    // database: "gentle_v1",
    database: "gentle_v1",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: 25060,
});

module.exports = pool;
