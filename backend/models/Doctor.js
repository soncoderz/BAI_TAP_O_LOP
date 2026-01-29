const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: String,
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  },
  experience: Number, // years
  bio: String,
  photo: String,
  available: {
    type: Boolean,
    default: true,
  },
  availability: {
    monday: { from: String, to: String },
    tuesday: { from: String, to: String },
    wednesday: { from: String, to: String },
    thursday: { from: String, to: String },
    friday: { from: String, to: String },
    saturday: { from: String, to: String },
    sunday: { from: String, to: String },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Doctor', DoctorSchema);
