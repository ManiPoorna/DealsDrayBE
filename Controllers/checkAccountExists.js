const User = require("../Schemas/userSchema")

// Function to check if an account exists with a given email or username
async function checkAccountExists(email, username) {
  try {
    const user = await User.findOne({ $or: [{ email: email }, { username: username }] });
    return user
  } catch (error) {
    console.error('Error checking account:', error);
    return false;
  }
}

module.exports = checkAccountExists
