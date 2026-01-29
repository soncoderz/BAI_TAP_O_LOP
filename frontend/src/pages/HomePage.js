import React from 'react';

function HomePage() {
  return (
    <div className="home-page">
      <div className="hero">
        <h1>Chào mừng đến Bệnh Viện Quốc Tế</h1>
        <p>Chúng tôi cung cấp dịch vụ y tế chất lượng cao cho tất cả bệnh nhân</p>
      </div>

      <div className="features">
        <div className="card feature-card">
          <h2>👨‍⚕️ Bác Sĩ Giỏi</h2>
          <p>Đội ngũ bác sĩ có kinh nghiệm, được đào tạo bài bản</p>
        </div>
        <div className="card feature-card">
          <h2>📅 Đặt Lịch Online</h2>
          <p>Đặt lịch khám dễ dàng, nhanh chóng qua hệ thống online</p>
        </div>
        <div className="card feature-card">
          <h2>🏥 Cơ Sở Hiện Đại</h2>
          <p>Trang thiết bị y tế hiện đại, chuẩn quốc tế</p>
        </div>
        <div className="card feature-card">
          <h2>💊 Dịch Vụ Đa Dạng</h2>
          <p>Cung cấp các dịch vụ y tế toàn diện</p>
        </div>
      </div>

      <div className="contact-section">
        <h2>Thông Tin Liên Hệ</h2>
        <p>📱 Điện thoại: (84+) 123-456-789</p>
        <p>📧 Email: info@benhnien.com</p>
        <p>📍 Địa chỉ: 123 Đường Tự Do, Thành phố Hồ Chí Minh</p>
      </div>
    </div>
  );
}

export default HomePage;

const HomePage_css = `
.home-page {
  animation: fadeIn 0.5s ease-in;
}

.hero {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  padding: 3rem;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 2rem;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.feature-card {
  text-align: center;
}

.feature-card h2 {
  color: #1e3c72;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.contact-section {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  text-align: center;
}

.contact-section h2 {
  color: #1e3c72;
  margin-bottom: 1rem;
  font-size: 1.8rem;
}

.contact-section p {
  margin: 0.5rem 0;
  font-size: 1.1rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 2rem;
  }

  .hero h1 {
    font-size: 2rem;
  }

  .hero p {
    font-size: 1rem;
  }

  .features {
    grid-template-columns: 1fr;
  }
}
`;
