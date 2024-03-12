const express = require('express');
const Employee = require('../Schemas/employeeSchema');
const employeeList = express.Router();

employeeList.get("/get-employee-list", async (req, res) => {
  try {
    const employeeList = await Employee.aggregate([
      {
        $sort: { date: -1 }
      },
      {
        $facet: {
          data: []
        },
      },
    ])
    return res.send({
      status: 200,
      message: "Data Fetched successfully",
      data: employeeList[0].data
    })
  } catch (error) {
    return res.send({
      status: 400,
      message: "Some error occured" + error.message
    })
  }
})

module.exports = employeeList;