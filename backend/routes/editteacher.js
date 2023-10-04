const express = require("express");
const router = express.Router();
const connection = require("../db");

router.post('/', async (req, res) => {
  const email = req.body.email;
  const prn = req.body.prn;
  const gender = req.body.gender;
  const mobile = req.body.mobile;
  const dept = req.body.dept;
  const name = req.body.name;

    const sql="update table student set name=? gender=? mobile=? email=? department=? where prn=?  "
    connection.query(sql, [name,gender,mobile,email,dept,prn],(err, data) => {
        if (err) {
            console.log(err.message)
          return res.json(err);
        }
          return res.json(data)
        });


});
  
module.exports = router;