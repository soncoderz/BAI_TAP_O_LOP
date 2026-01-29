const express = require('express');
const { register, login, logout, getMe, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Routes không cần xác thực
router.post('/register', register);
router.post('/login', login);

// Routes cần xác thực
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);
router.put('/updateprofile', protect, updateProfile);

module.exports = router;
