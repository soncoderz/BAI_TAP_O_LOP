const Department = require('../models/Department');

// Get all departments
exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find()
      .populate('headDoctor')
      .populate('doctors')
      .populate('services');
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get department by ID
exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id)
      .populate('headDoctor')
      .populate('doctors')
      .populate('services');
    if (!department) return res.status(404).json({ message: 'Phòng khám không tìm thấy' });
    res.json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create department
exports.createDepartment = async (req, res) => {
  const department = new Department(req.body);
  try {
    const newDepartment = await department.save();
    res.status(201).json(newDepartment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update department
exports.updateDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(404).json({ message: 'Phòng khám không tìm thấy' });
    
    Object.assign(department, req.body);
    const updatedDepartment = await department.save();
    res.json(updatedDepartment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete department
exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) return res.status(404).json({ message: 'Phòng khám không tìm thấy' });
    res.json({ message: 'Phòng khám đã bị xóa' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
