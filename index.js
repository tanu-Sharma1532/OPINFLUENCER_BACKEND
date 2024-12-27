// app.js
const express = require('express');
const app = express();
const authRoutes = require('./routes/userRoutes/authRoutes');
const db = require('./config/database');  // Import the database connection
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Use the auth routes
app.use('/api/auth', authRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// Ensure the database connection is established before starting the server
db.connect((err) => {
    if (err) {
        console.error('Failed to connect to database:', err);
        process.exit(1);  // Exit the application if DB connection fails
    } else {
        console.log('Connected to MySQL database');
        
        // Start the server only after a successful DB connection
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    }
});
