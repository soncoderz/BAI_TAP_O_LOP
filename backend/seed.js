const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Doctor = require('./models/Doctor');
const Department = require('./models/Department');
const Service = require('./models/Service');
const Patient = require('./models/Patient');

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hospital_system', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected for seeding...');

    // Clear existing data
    await Doctor.deleteMany({});
    await Department.deleteMany({});
    await Service.deleteMany({});
    await Patient.deleteMany({});

    // Create Departments
    const departments = await Department.create([
      {
        name: 'Phòng Khám Ngoại',
        description: 'Chuyên khoa phẫu thuật tổng hợp',
        phone: '(84+) 123-4567',
        email: 'surgery@hospital.com',
        floor: 'Tầng 3',
      },
      {
        name: 'Phòng Khám Nội',
        description: 'Chuyên khoa bệnh lý nội',
        phone: '(84+) 123-4568',
        email: 'internal@hospital.com',
        floor: 'Tầng 2',
      },
      {
        name: 'Phòng Khám Nha',
        description: 'Chuyên khoa nha khoa',
        phone: '(84+) 123-4569',
        email: 'dental@hospital.com',
        floor: 'Tầng 1',
      },
    ]);

    // Create Doctors
    const doctors = await Doctor.create([
      {
        name: 'Tiến sĩ. Nguyễn Văn A',
        specialization: 'Phẫu thuật tổng hợp',
        email: 'nguyenvana@hospital.com',
        phone: '0901-234-567',
        departmentId: departments[0]._id,
        experience: 15,
        bio: 'Bác sĩ có kinh nghiệm 15 năm trong lĩnh vực phẫu thuật',
        available: true,
      },
      {
        name: 'Tiến sĩ. Trần Thị B',
        specialization: 'Tim mạch',
        email: 'tranthib@hospital.com',
        phone: '0902-234-567',
        departmentId: departments[1]._id,
        experience: 12,
        bio: 'Chuyên gia về bệnh tim mạch',
        available: true,
      },
      {
        name: 'Thạc sĩ. Lê Văn C',
        specialization: 'Nha khoa',
        email: 'levanc@hospital.com',
        phone: '0903-234-567',
        departmentId: departments[2]._id,
        experience: 8,
        bio: 'Nha sĩ giàu kinh nghiệm trong điều trị nha khoa',
        available: true,
      },
    ]);

    // Create Services
    const services = await Service.create([
      {
        name: 'Phẫu thuật cơ bản',
        description: 'Các phẫu thuật thường quy',
        departmentId: departments[0]._id,
        price: 5000000,
        duration: 120,
        available: true,
      },
      {
        name: 'Khám tim mạch',
        description: 'Khám và tư vấn bệnh tim mạch',
        departmentId: departments[1]._id,
        price: 500000,
        duration: 30,
        available: true,
      },
      {
        name: 'Vệ sinh răng',
        description: 'Vệ sinh và lấy cao răng',
        departmentId: departments[2]._id,
        price: 300000,
        duration: 45,
        available: true,
      },
      {
        name: 'Trám răng',
        description: 'Trám và hàn phục hồi',
        departmentId: departments[2]._id,
        price: 400000,
        duration: 60,
        available: true,
      },
    ]);

    // Create Patients
    const patients = await Patient.create([
      {
        name: 'Trịnh Công Sơn',
        email: 'trinhcs@email.com',
        phone: '0912-345-678',
        dateOfBirth: '1995-05-15',
        gender: 'Nam',
        address: '123 Đường Lý Tự Trọng, TP.HCM',
        medicalHistory: 'Không có bệnh lý nền',
        allergies: ['Penicillin'],
      },
      {
        name: 'Phạm Thị Hương',
        email: 'phamhuong@email.com',
        phone: '0913-345-678',
        dateOfBirth: '1990-08-22',
        gender: 'Nữ',
        address: '456 Đường Nguyễn Huệ, TP.HCM',
        medicalHistory: 'Tiểu đường type 2',
        allergies: [],
      },
    ]);

    // Update departments with doctors and services
    await Department.findByIdAndUpdate(departments[0]._id, {
      headDoctor: doctors[0]._id,
      doctors: [doctors[0]._id],
      services: [services[0]._id],
    });

    await Department.findByIdAndUpdate(departments[1]._id, {
      headDoctor: doctors[1]._id,
      doctors: [doctors[1]._id],
      services: [services[1]._id],
    });

    await Department.findByIdAndUpdate(departments[2]._id, {
      headDoctor: doctors[2]._id,
      doctors: [doctors[2]._id],
      services: [services[2]._id, services[3]._id],
    });

    console.log('✓ Database seeded successfully!');
    console.log('- Departments: 3');
    console.log('- Doctors: 3');
    console.log('- Services: 4');
    console.log('- Patients: 2');

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
