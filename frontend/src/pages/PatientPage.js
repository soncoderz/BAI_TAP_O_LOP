import React, { useState, useEffect } from 'react';
import { patientService, appointmentService } from '../services/api';

function PatientPage() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    medicalHistory: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await patientService.getAll();
        setPatients(response.data);
      } catch (err) {
        setError('Lỗi khi tải bệnh nhân: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleSelectPatient = async (patient) => {
    setSelectedPatient(patient);
    setFormData(patient);
    try {
      const response = await appointmentService.getByPatient(patient._id);
      setAppointments(response.data);
    } catch (err) {
      console.error('Lỗi tải lịch khám:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedPatient) {
        await patientService.update(selectedPatient._id, formData);
        setSuccess('Cập nhật bệnh nhân thành công!');
        const response = await patientService.getAll();
        setPatients(response.data);
      } else {
        await patientService.create(formData);
        setSuccess('Thêm bệnh nhân mới thành công!');
        const response = await patientService.getAll();
        setPatients(response.data);
      }
      setIsEditing(false);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Lỗi: ' + err.message);
    }
  };

  if (loading) return <div className="loading">Đang tải...</div>;

  return (
    <div className="patient-page">
      <h1>Quản Lý Hồ Sơ Bệnh Nhân</h1>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Patient List */}
        <div>
          <h2>Danh Sách Bệnh Nhân</h2>
          <div style={{ marginBottom: '1rem' }}>
            <button className="btn" onClick={() => { setSelectedPatient(null); setIsEditing(true); setFormData({ name: '', email: '', phone: '', dateOfBirth: '', gender: '', address: '', medicalHistory: '' }); }}>
              + Thêm Bệnh Nhân Mới
            </button>
          </div>
          {patients.map(patient => (
            <div
              key={patient._id}
              className="card"
              onClick={() => handleSelectPatient(patient)}
              style={{ cursor: 'pointer', marginBottom: '0.5rem', backgroundColor: selectedPatient?._id === patient._id ? '#e3f2fd' : 'white' }}
            >
              <p><strong>{patient.name}</strong></p>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>{patient.email}</p>
            </div>
          ))}
        </div>

        {/* Patient Details */}
        <div>
          {selectedPatient || isEditing ? (
            <form className="form" onSubmit={handleSubmit} style={{ maxWidth: 'none' }}>
              <h2>{selectedPatient ? 'Chỉnh Sửa Bệnh Nhân' : 'Thêm Bệnh Nhân Mới'}</h2>

              <div className="form-group">
                <label>Tên</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Điện Thoại</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Ngày Sinh</label>
                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Giới Tính</label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="">-- Chọn --</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>

              <div className="form-group">
                <label>Địa Chỉ</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Tiền Sử Bệnh Tật</label>
                <textarea name="medicalHistory" value={formData.medicalHistory} onChange={handleChange}></textarea>
              </div>

              <button type="submit" className="btn">Lưu</button>
              <button type="button" className="btn btn-secondary" onClick={() => { setIsEditing(false); setSelectedPatient(null); }} style={{ marginLeft: '0.5rem' }}>
                Hủy
              </button>
            </form>
          ) : (
            <div>
              <p>Chọn bệnh nhân để xem chi tiết hoặc thêm bệnh nhân mới.</p>
            </div>
          )}

          {selectedPatient && appointments.length > 0 && (
            <div style={{ marginTop: '2rem' }}>
              <h2>Lịch Khám Của {selectedPatient.name}</h2>
              <div className="grid">
                {appointments.map(apt => (
                  <div key={apt._id} className="card">
                    <p><strong>Bác sĩ:</strong> {apt.doctorId?.name || 'N/A'}</p>
                    <p><strong>Ngày:</strong> {new Date(apt.appointmentDate).toLocaleDateString('vi-VN')}</p>
                    <p><strong>Giờ:</strong> {apt.timeSlot}</p>
                    <p><strong>Trạng thái:</strong> {apt.status}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PatientPage;
