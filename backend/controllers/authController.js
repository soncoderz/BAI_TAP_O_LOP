const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Tạo JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'hospital_secret_key_2024', {
    expiresIn: '7d'
  });
};

// @route   POST /api/auth/register
// @desc    Đăng ký người dùng mới
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    // Kiểm tra thông tin bắt buộc
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập tên, email và mật khẩu'
      });
    }

    // Kiểm tra email đã tồn tại
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'Email đã được đăng ký'
      });
    }

    // Tạo user mới
    user = new User({
      name,
      email,
      password,
      phone: phone || '',
      role: role || 'patient'
    });

    await user.save();

    // Tạo token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Đăng ký thành công',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi đăng ký: ' + error.message
    });
  }
};

// @route   POST /api/auth/login
// @desc    Đăng nhập người dùng
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra thông tin bắt buộc
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập email và mật khẩu'
      });
    }

    // Tìm user và lấy password
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email hoặc mật khẩu không đúng'
      });
    }

    // Kiểm tra password
    const isPasswordMatch = await user.matchPassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Email hoặc mật khẩu không đúng'
      });
    }

    // Tạo token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Đăng nhập thành công',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi đăng nhập: ' + error.message
    });
  }
};

// @route   GET /api/auth/me
// @desc    Lấy thông tin user hiện tại
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi: ' + error.message
    });
  }
};

// @route   POST /api/auth/logout
// @desc    Đăng xuất
// @access  Private
exports.logout = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Đăng xuất thành công'
  });
};

// @route   PUT /api/auth/updateprofile
// @desc    Cập nhật thông tin user
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;

    let user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User không tìm thấy'
      });
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Cập nhật thành công',
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi: ' + error.message
    });
  }
};
