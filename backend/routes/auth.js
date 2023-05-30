const express = require("express");
const secretKey = require("../config/config");
const router = express.Router();
const connection = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post('/', async (req, res) => {
  try {
    const email = req.body.email;
    const pass = req.body.pass;
    console.log(pass);

    const data = await queryPromise("SELECT * FROM login WHERE email = ?", [email]);

    if (data.length) {
      console.log(data[0].password);
      const compassword = await bcrypt.compare(pass, data[0].password);

      if (!compassword) {
        return res.json([{ msg: "Invalid Credentials" }]);
      }

      let id = "";
      switch (data[0].role) {
        case 'Admin': {
          id = "admin";
          break;
        }
        case 'Student': {
          const studentData = await queryPromise("SELECT prn FROM student WHERE email = ?", [email]);
          id = studentData[0].prn;
          break;
        }
        case 'Teacher': {
          const teacherData = await queryPromise("SELECT teacher_id FROM teacher WHERE email = ?", [email]);
          id = teacherData[0].teacher_id;
          break;
        }
      }

      const authToken = jwt.sign(id, secretKey.secretKey);
      const payload = [{
        msg: "0",
        role: data[0].role,
        authToken
      }];

      return res.json(payload);
    } else {
      return res.json([{ msg: "Invalid Credentials" }]);
    }
  } catch (err) {
    console.error(err);
    return res.json([{ msg: "An error occurred" }]);
  }
    });

function queryPromise(query, params) {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

module.exports = router;
