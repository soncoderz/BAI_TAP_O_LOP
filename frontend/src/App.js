import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AppointmentPage from './pages/AppointmentPage';
import DoctorsPage from './pages/DoctorsPage';
import DepartmentsPage from './pages/DepartmentsPage';
import ServicesPage from './pages/ServicesPage';
import PatientPage from './pages/PatientPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { logout } from './services/api';

function AppContent() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra user đã đăng nhập
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      await logout(token);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>🏥 Bệnh Viện Quốc Tế</h1>
        </div>
        <ul className="navbar-menu">
          <li><Link to="/">Trang Chủ</Link></li>
          <li><Link to="/doctors">Bác Sĩ</Link></li>
          <li><Link to="/departments">Phòng Khám</Link></li>
          <li><Link to="/services">Dịch Vụ</Link></li>
          <li><Link to="/appointment">Đặt Lịch</Link></li>
          <li><Link to="/patient">Hồ Sơ Bệnh Nhân</Link></li>
          
          {user ? (
            <>
              <li className="nav-user">
                <span>👤 {user.name}</span>
              </li>
              <li>
                <button onClick={handleLogout} className="btn-logout">
                  Đăng Xuất
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="btn-link">Đăng Nhập</Link></li>
              <li><Link to="/register" className="btn-link">Đăng Ký</Link></li>
            </>
          )}
        </ul>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/patient" element={<PatientPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>&copy; 2024 Bệnh Viện Quốc Tế. Tất cả quyền được bảo lưu.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
