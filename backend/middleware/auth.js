const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware để bảo vệ route
exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Không có token, vui lòng đăng nhập'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'hospital_secret_key_2024');
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token không hợp lệ'
    });
  }
};
