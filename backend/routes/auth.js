const express = require('express');
const {
    register,
    login,
    logout,
    getMe,
    changePassword
} = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.post('/logout', auth, logout);
router.put('/change-password', auth, changePassword);

module.exports = router;