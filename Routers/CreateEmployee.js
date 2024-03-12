const express = require('express');
const Employee = require('../Schemas/employeeSchema');
const createEmployee = express.Router();
const validator = require('validator')

createEmployee.post("/create-employee", async(req, res) => {
  const { name, email, mobile, designation, gender, course } = req.body;
  const employee = new Employee({
    name: name,
    email: email,
    mobile: mobile,
    designation: designation,
    gender: gender,
    course: course
  })
  if (!validator.isMobilePhone(mobile)) {
    return res.send({
      status: 401,
      message : "Enter valid mobile number"
    })
  }
  try {
    const employeeDb = await employee.save();
      return res.send({
        status: 201,
        message: 'Employee added successfully',
      })
  } catch (error) {
    return res.send({
      status: 400,
      message : "Database Error: " + error
    })
  }
})

module.exports = createEmployee