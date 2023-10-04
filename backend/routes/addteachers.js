const express = require("express");
const router = express.Router();
const connection = require("../db");
const bcrypt = require("bcryptjs");

router.post('/', async (req, res) => {
  
    const email = req.body.email;
    const pass = req.body.pass;
    const teacher_id = req.body.teacher_id;
    const gender = req.body.gender;
    const mobile = req.body.mobile;
    const name = req.body.name;
    const spec=req.body.spec;
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPass = await bcrypt.hash(pass, salt);
    const q = "select * from login where email=?";
  connection.query(q, [email], (err, data) => {
    if (err) {
      return res.json({ msg: "User already exists" });
    }
    if (!data.length){
    const q1 = "INSERT INTO teacher VALUES (?, ?, ?, ?, ?, ?)";
    const q2 = "INSERT INTO login(email, password, role) VALUES (?, ?, 'Teacher')";

    connection.query(q1, [teacher_id, name, gender, mobile, email,spec], (err, data1) => {
      if (err) {
        return res.json({ "msg": "User already exists" });
      }
        connection.query(q2, [email, hashedPass], (err, data2) => {
          if (err) {
            //return res.json({"msg":"Login Already Exists"});
            return res.json(err);
          }

          if (data2.affectedRows !== 0) {

            return res.json({ "msg": "Teacher added successfully" });
          } 
        });
       
    });
  }
  else{
    return res.json({ msg: "User already exists" })
  }
  });
  

});

module.exports = router;
