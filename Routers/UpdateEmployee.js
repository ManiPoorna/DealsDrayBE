const express = require('express');
const Employee = require('../Schemas/employeeSchema');
const updateEmployee = express.Router();

updateEmployee.post("/update-employee", async (req, res) => {
  const emailToBeUpdated = req.query.email;
  const { name, email, mobile, designation, gender, course } = req.body;
  const updatedEmployeeData = {
    name: name,
    email: email,
    mobile: mobile,
    designation: designation,
    gender: gender,
    course: course,
    date:Date.now()
  }
  try {
    const updatedDocument = await Employee.findOneAndUpdate(
      { email : emailToBeUpdated},
      updatedEmployeeData,
      { new: true }
    );
    // Handle if the document doesn't exist
    if (!updatedDocument) {
      return res.send({
        status: 400,
        message: "Some Error occurred, please try again later"
      })
    }
    else {
      return res.send({
        status: 201,
        message: "Employee updated successfully,Please Refresh page again",
        data: updatedDocument
      })
    }
  }
  catch (error) {
    return res.send({
      status: 400,
      message: "Database Error: " + error.message
    })
  }
})

module.exports = updateEmployee