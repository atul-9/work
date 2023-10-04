const express = require("express");
const router = express.Router();
const connection = require("../db");


router.post('/', async (req, res) => {
      const project_id=req.body.project_id;
      const q1='select pa.project_id , title,domain, technology_used,name, semester, p.status from project_allocation pa, teacher t ,project p  where pa.teacher_id=t.teacher_id and pa.project_id=p.project_id and pa.project_id =?';
      connection.query(q1, [project_id],(err, data) => {
          if (err) {
              console.log(err.message)
            return res.json(err);
          }
            data[0].files=0;
            data[0].reviews=0;
            return res.json(data)
          });
  });
  
  module.exports = router;