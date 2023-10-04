const express = require("express");
const router = express.Router();
const connection = require("../db");

router.get('/', async (req, res) => {
    const teacher_id = req.query.teacher_id;

      const q1='select *from teacher where teacher_id =? ';
      connection.query(q1, [teacher_id],(err, data) => {
          if (err) {
              console.log(err.message)
            return res.json(err);
          }
            return res.json(data)
          });
  });
  
  module.exports = router;