const db = require('../../config/database');
const bcrypt = require('bcryptjs');

// Model method to check if a user already exists
const checkUserExists = (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
    });
};

// Model method to create a new user
const createUser = (name, email, mobile, password, callback) => {
    // Hash the password before saving
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return callback(err, null);

        const query = 'INSERT INTO users (name, email, mobile, password) VALUES (?, ?, ?, ?)';
        db.query(query, [name, email, mobile, hashedPassword], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    });
};

module.exports = {
    checkUserExists,
    createUser
};
