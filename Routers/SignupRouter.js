const express = require('express');
const signUpRouter = express.Router();
const validator = require('validator');
const User = require('../Schemas/userSchema');
const checkAccountExists = require('../Controllers/checkAccountExists');

signUpRouter.post("/signup", async (req, res) => {

  const { username, email, password, confirm_password } = req.body;

  // Basic checks for user information.
  if (!username || !email || !password) {
    return res.send({
      status: 401,
      message: "Please enter all details"
    })
  }
  if (username.trim().length < 3) {
    return res.send({ status: 401, message: "User name must be at least 3 characters" })
  }
  if (password.trim().length < 6) {
    return res.send({ status: 401, message: "Password must be at least 6 characters" })
  }
  if (password !== confirm_password) {
    return res.send({ status: 401, message: "Password not matched" })
  }
  if (!validator.isEmail(email)) {
    return res.send({ status: 401, message: "Please enter valid Email Address" })
  }

  // Chekcs whether acoount exists or not
  const userDetails = await checkAccountExists(email, username);
  if (userDetails === null) {
    // create user object using mongoose schema
    const user = new User({
      username: username,
      email: email,
      password: password,
      isLoggedin : false
    })
    try {
      // save user to databases
      const userDb = await user.save();
      return res.send({ status: 201, message: "Account created successfully",data : userDb })
    } catch (error) {
      return res.send({ status: 500, message: "Something went wrong, Please try again later", error })
    }
  }
  else {
    return res.send({ status: 500, message: "Account already exists, Please use another email", })
  }
})

module.exports = signUpRouter