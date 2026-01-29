import React, { useState, useEffect } from 'react';
import { departmentService } from '../services/api';

function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await departmentService.getAll();
        setDepartments(response.data);
      } catch (err) {
        setError('Lỗi khi tải danh sách phòng khám: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="departments-page">
      <h1>Danh Sách Phòng Khám</h1>
      <div className="grid">
        {departments.length > 0 ? (
          departments.map((dept) => (
            <div key={dept._id} className="card department-card">
              <h2>{dept.name}</h2>
              {dept.description && <p>{dept.description}</p>}
              <p><strong>Điện thoại:</strong> {dept.phone || 'N/A'}</p>
              <p><strong>Email:</strong> {dept.email || 'N/A'}</p>
              <p><strong>Tầng:</strong> {dept.floor || 'N/A'}</p>
              <p><strong>Số bác sĩ:</strong> {dept.doctors ? dept.doctors.length : 0}</p>
              <p><strong>Số dịch vụ:</strong> {dept.services ? dept.services.length : 0}</p>
              <button className="btn">Chi Tiết</button>
            </div>
          ))
        ) : (
          <p>Không có phòng khám nào.</p>
        )}
      </div>
    </div>
  );
}

export default DepartmentsPage;
