# 🏥 HỆ THỐNG QUẢN LÝ BỆNH VIỆN
## Hospital Management System

---

## 🚀 HƯỚNG DẪN CHẠY DỰ ÁN

### **BƯỚC 1: Cài Đặt MongoDB**

#### **Cách 1: Cài Đặt Local (Windows)**
1. Tải MongoDB Community từ: https://www.mongodb.com/try/download/community
2. Chọn version cho Windows
3. Cài đặt mặc định (chọn "Install MongoDB as a Service")
4. MongoDB sẽ chạy tự động trên `mongodb://localhost:27017`

#### **Cách 2: Dùng MongoDB Atlas (Cloud - Khuyên Dùng)**
1. Đăng ký tại: https://www.mongodb.com/cloud/atlas
2. Tạo cluster miễn phí
3. Lấy connection string
4. Cập nhật vào `backend/.env`

---

### **BƯỚC 2: Setup Backend (Node.js)**

```bash
# 1. Mở PowerShell/Command Prompt
# 2. Vào thư mục backend
cd backend

# 3. Cài đặt dependencies
npm install

# 4. Nếu chưa có file .env, tạo file mới với nội dung:
# MONGODB_URI=mongodb://localhost:27017/hospital_system
# PORT=5000
# NODE_ENV=development

# 5. Seed dữ liệu mẫu (LỰA CHỌN)
node seed.js

# 6. Chạy server
npm run dev
# (Hoặc: npm start nếu không có nodemon)
```

✅ Backend chạy trên: `http://localhost:5000`

---

### **BƯỚC 3: Setup Frontend (React)**

```bash
# 1. Mở PowerShell/Command Prompt MỚI (giữ terminal backend chạy)
# 2. Vào thư mục frontend
cd frontend

# 3. Cài đặt dependencies
npm install

# 4. Chạy React
npm start
```

✅ Frontend mở tự động: `http://localhost:3000`

---

## 📋 TÍNH NĂNG HỆ THỐNG

| Tính Năng | Mô Tả |
|-----------|-------|
| 👨‍⚕️ Bác Sĩ | Xem danh sách bác sĩ, chuyên khoa, kinh nghiệm |
| 🏥 Phòng Khám | Quản lý phòng khám, bộ phận |
| 💊 Dịch Vụ | Dịch vụ y tế, giá, thời gian |
| 📅 Đặt Lịch | Đặt lịch khám online |
| 📝 Hồ Sơ Bệnh Nhân | Tạo, sửa, xem hồ sơ bệnh nhân |
| 📊 Lịch Khám | Xem lịch khám của bệnh nhân |

---

## 🗂️ CẤU TRÚC THƯ MỤC

```
DO AN XL/
├── BAI_TAP_O_LOP/
│   ├── backend/                 # API Server
│   │   ├── models/              # Database Schemas
│   │   │   ├── Doctor.js
│   │   │   ├── Patient.js
│   │   │   ├── Appointment.js
│   │   │   ├── Service.js
│   │   │   └── Department.js
│   │   ├── controllers/         # Business Logic
│   │   │   ├── doctorController.js
│   │   │   ├── patientController.js
│   │   │   ├── appointmentController.js
│   │   │   ├── serviceController.js
│   │   │   └── departmentController.js
│   │   ├── routes/              # API Routes
│   │   │   ├── doctorRoutes.js
│   │   │   ├── patientRoutes.js
│   │   │   ├── appointmentRoutes.js
│   │   │   ├── serviceRoutes.js
│   │   │   └── departmentRoutes.js
│   │   ├── server.js            # Main Server
│   │   ├── seed.js              # Seed Data
│   │   ├── package.json
│   │   ├── .env                 # Environment Variables
│   │   └── .gitignore
│   ├── frontend/                # React App
│   │   ├── public/
│   │   │   └── index.html
│   │   ├── src/
│   │   │   ├── pages/           # Page Components
│   │   │   │   ├── HomePage.js
│   │   │   │   ├── DoctorsPage.js
│   │   │   │   ├── DepartmentsPage.js
│   │   │   │   ├── ServicesPage.js
│   │   │   │   ├── AppointmentPage.js
│   │   │   │   └── PatientPage.js
│   │   │   ├── services/        # API Services
│   │   │   │   └── api.js
│   │   │   ├── App.js
│   │   │   ├── App.css
│   │   │   ├── index.js
│   │   │   └── index.css
│   │   ├── package.json
│   │   └── .gitignore
│   └── SETUP_GUIDE.md           # File này
```

---

## 🔧 CÁC API ENDPOINTS

### Bác Sĩ (Doctors)
```
GET    /api/doctors           - Lấy tất cả bác sĩ
GET    /api/doctors/:id       - Lấy bác sĩ theo ID
POST   /api/doctors           - Thêm bác sĩ mới
PUT    /api/doctors/:id       - Cập nhật bác sĩ
DELETE /api/doctors/:id       - Xóa bác sĩ
```

### Bệnh Nhân (Patients)
```
GET    /api/patients           - Lấy tất cả bệnh nhân
GET    /api/patients/:id       - Lấy bệnh nhân theo ID
POST   /api/patients           - Thêm bệnh nhân mới
PUT    /api/patients/:id       - Cập nhật bệnh nhân
DELETE /api/patients/:id       - Xóa bệnh nhân
```

### Lịch Khám (Appointments)
```
GET    /api/appointments                      - Lấy tất cả lịch khám
GET    /api/appointments/:id                  - Lấy lịch khám theo ID
GET    /api/appointments/patient/:patientId   - Lấy lịch khám của bệnh nhân
POST   /api/appointments                      - Đặt lịch khám mới
PUT    /api/appointments/:id                  - Cập nhật lịch khám
DELETE /api/appointments/:id                  - Hủy lịch khám
```

### Dịch Vụ (Services)
```
GET    /api/services           - Lấy tất cả dịch vụ
GET    /api/services/:id       - Lấy dịch vụ theo ID
POST   /api/services           - Thêm dịch vụ mới
PUT    /api/services/:id       - Cập nhật dịch vụ
DELETE /api/services/:id       - Xóa dịch vụ
```

### Phòng Khám (Departments)
```
GET    /api/departments           - Lấy tất cả phòng khám
GET    /api/departments/:id       - Lấy phòng khám theo ID
POST   /api/departments           - Thêm phòng khám mới
PUT    /api/departments/:id       - Cập nhật phòng khám
DELETE /api/departments/:id       - Xóa phòng khám
```

---

## 📊 DỮ LIỆU MẪU (sau khi chạy seed.js)

### 3 Phòng Khám:
- ✅ Phòng Khám Ngoại (Tầng 3)
- ✅ Phòng Khám Nội (Tầng 2)
- ✅ Phòng Khám Nha (Tầng 1)

### 3 Bác Sĩ:
- ✅ Tiến sĩ. Nguyễn Văn A - Phẫu thuật (15 năm)
- ✅ Tiến sĩ. Trần Thị B - Tim mạch (12 năm)
- ✅ Thạc sĩ. Lê Văn C - Nha khoa (8 năm)

### 4 Dịch Vụ:
- ✅ Phẫu thuật cơ bản (5,000,000 đ)
- ✅ Khám tim mạch (500,000 đ)
- ✅ Vệ sinh răng (300,000 đ)
- ✅ Trám răng (400,000 đ)

### 2 Bệnh Nhân:
- ✅ Trịnh Công Sơn
- ✅ Phạm Thị Hương

---

## 🆘 TROUBLESHOOTING

### ❌ "Cannot connect to MongoDB"
**Giải pháp:**
```bash
# Windows - Kiểm tra MongoDB Service
net start MongoDB

# Hoặc dùng MongoDB Atlas Cloud (dễ hơn)
```

### ❌ "CORS Error"
**Giải pháp:**
- CORS đã được enable trong `backend/server.js`
- Kiểm tra frontend URL và backend URL trùng nhau

### ❌ "Port 3000 hoặc 5000 đang sử dụng"
**Giải pháp:**
```bash
# Tìm process chiếm port 5000
netstat -ano | findstr :5000

# Kill process
taskkill /PID <PID> /F
```

### ❌ "npm command not found"
**Giải pháp:**
- Cài đặt Node.js từ: https://nodejs.org/

### ❌ "Không cài được dependencies"
**Giải pháp:**
```bash
# Clear npm cache
npm cache clean --force

# Xóa node_modules và package-lock.json
rmdir /s node_modules
del package-lock.json

# Cài lại
npm install
```

---

## 📱 GIAO DIỆN ỨNG DỤNG

### Trang Chủ
- Hero section chào mừng
- 4 Feature cards
- Thông tin liên hệ

### Danh Sách Bác Sĩ
- Hiển thị danh sách bác sĩ
- Filter theo chuyên khoa
- Nút "Đặt Lịch"

### Quản Lý Phòng Khám
- Danh sách phòng khám
- Số bác sĩ và dịch vụ
- Chi tiết phòng khám

### Danh Sách Dịch Vụ
- Hiển thị dịch vụ với giá
- Thời gian thực hiện
- Trạng thái có sẵn

### Đặt Lịch Khám
- Form đặt lịch
- Chọn bác sĩ, ngày, giờ
- Lịch khám gần đây

### Hồ Sơ Bệnh Nhân
- Danh sách bệnh nhân
- Thêm/sửa hồ sơ
- Xem lịch khám

---

## 🔐 BẢO MẬT (Tuỳ Chọn Mở Rộng)

```bash
# Cài Authentication
npm install jsonwebtoken bcryptjs

# Cài Validation
npm install joi

# Cài Email Service
npm install nodemailer

# Cài File Upload
npm install multer
```

---

## 📞 THÔNG TIN LIÊN HỆ

- 📧 Email: info@benhnien.com
- 📱 Điện thoại: (84+) 123-456-789
- 📍 Địa chỉ: 123 Đường Lý Tự Trọng, TP.HCM

---

## 👤 THÔNG TIN DỰ ÁN

- **Sinh viên:** Trịnh Công Sơn
- **MSSV:** 2280602769
- **Phiên bản:** 1.0.0
- **Ngày cập nhật:** 2024
- **License:** ISC

---

## ✅ KIỂM TRA

Sau khi hoàn thành, bạn sẽ có:

- [x] Backend Server chạy trên port 5000
- [x] React App chạy trên port 3000
- [x] MongoDB Database được kết nối
- [x] Tất cả API endpoints hoạt động
- [x] Dữ liệu mẫu được tạo
- [x] Giao diện tiếng Việt đầy đủ
- [x] Responsive design cho mobile
- [x] Tính năng Đặt Lịch Khám
- [x] Tính năng Quản Lý Bệnh Nhân
- [x] Tính năng Xem Bác Sĩ & Phòng Khám

---

**🎉 Chúc mừng! Dự án của bạn đã sẵn sàng!**
