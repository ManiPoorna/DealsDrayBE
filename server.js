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

const corsOptions = {
  origin: 'https://dealsdray.netlify.app/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))
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