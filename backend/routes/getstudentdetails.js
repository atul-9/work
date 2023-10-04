const express = require("express");
const router = express.Router();
const connection = require("../db");

router.get('/', async (req, res) => {
    const prn = req.query.prn;

      const q1='select *from student where prn =? ';
      connection.query(q1, [prn],(err, data) => {
          if (err) {
              console.log(err.message)
            return res.json(err);
          }
            return res.json(data)
          });
  });
  
  module.exports = router;