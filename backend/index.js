const express = require( "express");

const connection = require("./db.js")
const app=express();
const bodyParser = require('body-parser');

const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

app.use(express.json())//used for getting JSON Object
app.use('/api/auth', require("./routes/auth.js"))
app.use('/api/addstudent', require("./routes/addstudents.js"))
app.use('/api/addteacher', require("./routes/addteachers.js"))
app.use('/api/getstudent', require("./routes/getstudent.js"))
app.use('/api/getteacher', require("./routes/getteacher.js"))
app.use('/api/getstudents', require("./routes/getAllStudent.js"))
app.use('/api/getteachers', require("./routes/getAllTeacher.js"))
app.use('/api/getdept', require("./routes/getdept.js"))
app.use('/api/getstudentsforallocation', require("./routes/getstudentsforallocation.js"))
app.use('/api/getstudentdetail', require("./routes/getstudentdetails.js"))
app.use('/api/getteacherdetail', require("./routes/getteacherdetails.js"))
app.use('/api/addproject',require('./routes/addProject.js'))
app.use('/api/getallproject', require("./routes/getAllProject.js"))
app.use('/api/deletestudent', require("./routes/deletestudent.js"))
app.use('/api/deleteteacher', require("./routes/deleteteacher.js"))
app.use('/api/editstudent', require("./routes/editstudent.js"))
app.use('/api/editteacher', require("./routes/editteacher.js"))
app.use("/api/project",require("./routes/getstudentProject.js"))
app.use("/api/getprojectdetails",require("./routes/getprojectdetails.js"))
app.use("/api/editprojectdetails",require("./routes/editprojectDetails.js"))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  })
//
  

app.get('/',(req,res)=>{
    res.json("Hello Atul")
})
app.listen(8800,()=>{
    console.log("Connected to backend")
});