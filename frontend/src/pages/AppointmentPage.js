import React, { useState, useEffect } from 'react';
import { appointmentService, patientService, doctorService } from '../services/api';

function AppointmentPage() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    appointmentDate: '',
    timeSlot: '',
    reason: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientsRes = await patientService.getAll();
        const doctorsRes = await doctorService.getAll();
        const appointmentsRes = await appointmentService.getAll();
        setPatients(patientsRes.data);
        setDoctors(doctorsRes.data);
        setAppointments(appointmentsRes.data);
      } catch (err) {
        setError('Lỗi khi tải dữ liệu: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await appointmentService.create(formData);
      setSuccess('Đặt lịch khám thành công!');
      setFormData({ patientId: '', doctorId: '', appointmentDate: '', timeSlot: '', reason: '' });
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Lỗi khi đặt lịch: ' + err.message);
    }
  };

  if (loading) return <div className="loading">Đang tải...</div>;

  return (
    <div className="appointment-page">
      <h1>Đặt Lịch Khám</h1>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Bệnh Nhân</label>
          <select name="patientId" value={formData.patientId} onChange={handleChange} required>
            <option value="">-- Chọn bệnh nhân --</option>
            {patients.map(p => (
              <option key={p._id} value={p._id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Bác Sĩ</label>
          <select name="doctorId" value={formData.doctorId} onChange={handleChange} required>
            <option value="">-- Chọn bác sĩ --</option>
            {doctors.map(d => (
              <option key={d._id} value={d._id}>{d.name} ({d.specialization})</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Ngày Khám</label>
          <input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Giờ Khám</label>
          <input type="time" name="timeSlot" value={formData.timeSlot} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Lý Do Khám</label>
          <textarea name="reason" value={formData.reason} onChange={handleChange} placeholder="Mô tả lý do khám..."></textarea>
        </div>

        <button type="submit" className="btn">Đặt Lịch</button>
      </form>

      <h2>Lịch Khám Gần Đây</h2>
      <div className="grid">
        {appointments.length > 0 ? (
          appointments.map(apt => (
            <div key={apt._id} className="card">
              <p><strong>Bệnh nhân:</strong> {apt.patientId?.name || 'N/A'}</p>
              <p><strong>Bác sĩ:</strong> {apt.doctorId?.name || 'N/A'}</p>
              <p><strong>Ngày:</strong> {new Date(apt.appointmentDate).toLocaleDateString('vi-VN')}</p>
              <p><strong>Giờ:</strong> {apt.timeSlot}</p>
              <p><strong>Trạng thái:</strong> {apt.status}</p>
            </div>
          ))
        ) : (
          <p>Chưa có lịch khám nào.</p>
        )}
      </div>
    </div>
  );
}

export default AppointmentPage;
