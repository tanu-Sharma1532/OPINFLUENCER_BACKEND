const userModel = require('../../models/userModels/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup Controller
const signup = (req, res) => {
    const { name, email, mobile, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !mobile || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user already exists in the database
    userModel.checkUserExists(email, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        
        if (results.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user in the database
        userModel.createUser(name, email, mobile, password, (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error saving user' });
            }

            // Send response with the saved user data
            return res.status(201).json({
                message: 'User created successfully',
                data: results  // Send the results (saved user data) in the response
            });
        });
    });
};


// Login Controller
const login = (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists
    userModel.checkUserExists(email, (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (results.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const user = results[0];

        // Compare the provided password with the stored hashed password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ message: 'Error comparing passwords' });
            if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

            // Create JWT token
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                'OPENINFLUENCE', // Use a secure secret key in production
                { expiresIn: '1h' }
            );

            // Return the response with user data and the JWT token
            res.json({
                message: 'Login successful',
                token,
                data: user  // Send the user data from the database in the response
            });
        });
    });
};


module.exports = {
    signup,
    login
};
