const express = require('express');
const User = require('../Schemas/userSchema');
const checkAccountExists = require('../Controllers/checkAccountExists');
const logoutUser = express.Router();

logoutUser.post("/logout", async (req, res) => { 
  const { email } = req.body
  try {
    const userDetails = await checkAccountExists(email);
    // console.log("Login Route => ",userDetails);
    if (userDetails != null) {
      // check password (correct / wrong)
      const user = await User.findOneAndUpdate(
        { username: userDetails.username },
        { $set: { isLoggedin: false } },
        { new: true }
      );
      return res.send({ status: 200, message: "Logout successful", data: userDetails })
    }

  } catch (error) {
    return res.sendStatus({
      status: 500,
      message: "Database Error",
      error: error
    })
  }
})

 

module.exports = logoutUser