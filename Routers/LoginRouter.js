const express = require('express');
const loginRouter = express.Router();
const checkAccountExists = require('../Controllers/checkAccountExists');
const User = require('../Schemas/userSchema');

loginRouter.post("/login", async (req, res) => {
  // parsing loginid and password
  const { loginId, password } = req.body;
  if (!loginId || !password){return res.send({status : 401,message : "Please enter login credentials"})}

  const userDetails = await checkAccountExists(loginId, loginId);
  // console.log("Login Route => ",userDetails);
  if (userDetails != null) {
    // check password (correct / wrong)
    if (userDetails.password === password) {
      const user = await User.findOneAndUpdate(
        { username: userDetails.username },
        { $set: { isLoggedin: true } },
        { new: true }
      );
      return res.send({ status: 200, message: "Login successful",data :userDetails })
    }
    else {
      return res.send({ status: 401, message: "Incorrect Password" })
    }
  }
  else {
    return res.send({ status: 404, message: "User not found, Please Signup" })
  }
})

module.exports = loginRouter