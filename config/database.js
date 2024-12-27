// config/db.js
const mysql = require('mysql2');

// Create a connection to the MySQL database
const db = mysql.createConnection({
    host: '127.0.0.1',        // Database host
    user: 'root',             // Your MySQL username
    password: 'tanush1532',   // Your MySQL password
    database: 'OpenInfluencer_Api',  // Your database name
    port: 3306                // MySQL default port
});

// Connect to the MySQL database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('MySQL connected');
    }
});

module.exports = db;  // Exporting the connection to be used in other files
