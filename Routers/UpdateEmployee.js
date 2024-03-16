const express = require('express');
const Employee = require('../Schemas/employeeSchema');
const updateEmployee = express.Router();
const cloudinary = require("../cloudinary")
const upload = require("../multer")

let imageURL = "";

updateEmployee.post("/edit-uploaded-image", upload.single('image'), async (req, res) => {
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
    image : imageURL,
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