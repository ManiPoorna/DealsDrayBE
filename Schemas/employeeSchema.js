const mongoose = require('mongoose');

// Define the User Schema
const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true,unique: true},
  mobile: { type: String, required: true },
  designation: { type: String, required: true },
  gender: { type: String, required: true },
  course: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

// Create a Mongoose model from the schema
const Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee;