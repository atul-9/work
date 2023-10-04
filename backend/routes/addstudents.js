const express = require("express");
const router = express.Router();
const connection = require("../db");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;
  const prn = req.body.prn;
  const gender = req.body.gender;
  const mobile = req.body.mobile;
  const dept = req.body.dept;
  const name = req.body.name;

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPass = await bcrypt.hash(pass, salt);
  const q = "select * from login where email=?";
  connection.query(q, [email], (err, data) => {
    if (err) {
      return res.json({ msg: " User already exists" });
    }
    if (!data.length){
      const q1 = "INSERT INTO student VALUES (?, ?, ?, ?, ?, ?, 1)";
      const q2 = "INSERT INTO login(email, password, role) VALUES (?, ?, 'Student');";
  
      connection.query(
        q1,
        [prn, name, gender, email, mobile, dept],
        (err, data1) => {
          if (err) {
            return res.json({ msg: " User already exists" });
          }
          console.log(data1)
          connection.query(q2, [email, hashedPass], (err, data2) => {
            if (err) {
              //return res.json({"msg":"Login Already Exists"});
              return res.json(err);
            }
  
            if (data2.affectedRows !== 0) {
              console.log("Login added successfully");
              return res.json({ msg: "Student added successfully" });
            }
          });
        }
      );
    }
    else{
      return res.json({ msg: " User already exists" })
    }
    
  });
});

module.exports = router;
