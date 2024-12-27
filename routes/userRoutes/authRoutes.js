const express = require('express');
const router = express.Router();
const authController = require('../../controllers/userController/LoginSignUpController');

// Signup route
router.post('/signup', authController.signup);

// Login route
router.post('/login', authController.login);

module.exports = router;
