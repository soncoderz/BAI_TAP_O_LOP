import React, { useState, useEffect } from 'react';
import { serviceService } from '../services/api';

function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await serviceService.getAll();
        setServices(response.data);
      } catch (err) {
        setError('Lỗi khi tải danh sách dịch vụ: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="services-page">
      <h1>Danh Sách Dịch Vụ</h1>
      <div className="grid">
        {services.length > 0 ? (
          services.map((service) => (
            <div key={service._id} className="card service-card">
              <h2>{service.name}</h2>
              {service.description && <p>{service.description}</p>}
              <p><strong>Giá:</strong> {service.price ? service.price.toLocaleString('vi-VN') + ' đ' : 'N/A'}</p>
              <p><strong>Thời lượng:</strong> {service.duration ? service.duration + ' phút' : 'N/A'}</p>
              <p><strong>Trạng thái:</strong> {service.available ? '✓ Có sẵn' : '✗ Không có sẵn'}</p>
              <button className="btn">Thông Tin Thêm</button>
            </div>
          ))
        ) : (
          <p>Không có dịch vụ nào.</p>
        )}
      </div>
    </div>
  );
}

export default ServicesPage;
