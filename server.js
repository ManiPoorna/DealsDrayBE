const express = require('express');
const signUpRouter = require('./Routers/SignupRouter');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const loginRouter = require('./Routers/LoginRouter');
const createEmployee = require('./Routers/CreateEmployee');
const employeeList = require('./Routers/EmployeeList');
const updateEmployee = require('./Routers/UpdateEmployee');
const deleteEmployee = require('./Routers/DeleteEmployee');
// Mongo URI
const PORT = 3000
const MONGO_URI = "mongodb+srv://ManiPoorna:manipoorna@cluster0.gkutk5n.mongodb.net/dealsdray"

// mogodb Connection
mongoose.connect(MONGO_URI).then(() => {
  console.log("MongoDB Connected")
}).catch(err => console.log(err));


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())
// Routers
app.use("/dealsdray", signUpRouter)
app.use("/dealsdray", loginRouter)
app.use("/dealsdray", createEmployee)
app.use("/dealsdray", employeeList)
app.use("/dealsdray", updateEmployee)
app.use("/dealsdray", deleteEmployee)


app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
})