const express = require("express");
const router = express.Router();
const connection = require("../db");

router.post('/', async (req, res) => {
  const sem = req.body.sem;
  const dept=req.body.dept;

    const q1='select prn,name from student where prn not in (select prn from project_allocation where semester=? ) and department=? and status= 1 order by prn;';
    connection.query(q1, [sem,dept],(err, data) => {
        if (err) {
            console.log(err.message)
          return res.json(err);
        }
          return res.json(data)
        });
});

module.exports = router;