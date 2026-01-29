import React, { useState, useEffect } from 'react';
import { doctorService } from '../services/api';

function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await doctorService.getAll();
        setDoctors(response.data);
      } catch (err) {
        setError('Lỗi khi tải danh sách bác sĩ: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="doctors-page">
      <h1>Danh Sách Bác Sĩ</h1>
      <div className="grid">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div key={doctor._id} className="card doctor-card">
              <h2>{doctor.name}</h2>
              <p><strong>Chuyên khoa:</strong> {doctor.specialization}</p>
              <p><strong>Kinh nghiệm:</strong> {doctor.experience || 'N/A'} năm</p>
              <p><strong>Email:</strong> {doctor.email}</p>
              <p><strong>Điện thoại:</strong> {doctor.phone || 'N/A'}</p>
              <p><strong>Trạng thái:</strong> {doctor.available ? '✓ Có sẵn' : '✗ Không có sẵn'}</p>
              {doctor.bio && <p><strong>Tiểu sử:</strong> {doctor.bio}</p>}
              <button className="btn">Đặt Lịch</button>
            </div>
          ))
        ) : (
          <p>Không có bác sĩ nào.</p>
        )}
      </div>
    </div>
  );
}

export default DoctorsPage;
