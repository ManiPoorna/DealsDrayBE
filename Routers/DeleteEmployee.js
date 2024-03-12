const express = require('express');
const Employee = require('../Schemas/employeeSchema');
const deleteEmployee = express.Router();


deleteEmployee.post("/delete-employee", async(req, res) => {
  const emailToBeUpdated = req.query.email;
  try {
    const deletedEmployee = await Employee.findOneAndDelete(
      { email: emailToBeUpdated }
    ) 
    return res.send({
      status: 200,
      message : "Employee deleted successfully"
    })
  } catch (error) {
    return res.send({
      status: 400,
      message : "Database error: " + error.message
    })
  }
})


module.exports = deleteEmployee;