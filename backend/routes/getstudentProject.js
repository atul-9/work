const express = require("express");
const router = express.Router();
const connection = require("../db");
const fetchid= require("../middleware/getId")

router.post('/',fetchid, async (req, res) => {
      const prn=req.userid;
      const q1='select pa.project_id , title, semester, p.status from project_allocation pa, teacher t ,project p where pa.teacher_id=t.teacher_id and pa.project_id=p.project_id and pa.prn=?';
      connection.query(q1, [prn],(err, data) => {
          if (err) {
              console.log(err.message)
            return res.json(err);
          }

            return res.json(data)
          });
  });
  
  module.exports = router;