const express = require('express');
const Employee = require('../Schemas/employeeSchema');
const createEmployee = express.Router();
const validator = require('validator')
const cloudinary = require("../cloudinary");
const upload = require("../multer")

let imageURL = "";

createEmployee.post("/upload-image", upload.single('image'), async (req, res) => {
  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      const imageUrl = cloudinary.url(result.public_id, { secure: true });
      imageURL = imageUrl;
      return res.status(200).send({
        status: 200,
        message: 'Image uploaded successfully',
        data: imageUrl
      });
    } else {
      return res.status(400).send({
        status: 400,
        message: 'No file uploaded'
      });
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    return res.status(500).send({
      status: 500,
      message: 'Internal Server Error',
      error: error
    });
  }
});

createEmployee.post("/create-employee", async(req, res) => {
  const { name, email, mobile, designation, gender, course } = req.body;
  const employee = new Employee({
    name: name,
    email: email,
    mobile: mobile,
    designation: designation,
    gender: gender,
    course: course,
    image : imageURL
  })
  if (!validator.isMobilePhone(mobile)) {
    return res.send({
      status: 401,
      message : "Enter valid mobile number"
    })
  }
  try {
    const employeeDb = await employee.save();
    console.log("saved employee=>",employee);
      return res.send({
        status: 201,
        message: 'Employee added successfully',
        data: employeeDb,
      })
  } catch (error) {
    return res.send({
      status: 400,
      message : "Database Error: " + error
    })
  }
})

module.exports = createEmployee