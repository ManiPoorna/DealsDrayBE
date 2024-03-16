const express = require('express');
const checkUserAuth = express.Router();
const checkAccountExists = require("../Controllers/checkAccountExists")
const User = require("../Schemas/userSchema")

checkUserAuth.post("/user-login-check", async (req, res) => {
  const { email } = req.body
  
  try {
    const userData = await User.findOne({ email : email});
      return res.send({
        status: 200,
        message: "User loggedin successfully",
        data: userData
      })
    }
    catch (e) {
      return res.send({
        status: 400,
        message: "Database Error",
        error : e.message
      }
      )
    }
})
  
module.exports = checkUserAuth