const express = require("express");
const router = express.Router();
const connection = require("../db");


router.post('/', async (req, res) => {
      const project_id=req.body.project_id;
      const title=req.body.title;
      const technology_used=req.body.technology_used;
      const domain=req.body.domain;
      const q1='update project set title=?,  technology_used=?, domain=? where project_id=? ';
      connection.query(q1, [title,technology_used,domain,project_id],(err, data) => {
          if (err) {
              console.log(err.message)
            return res.json(err);
          }
          if(data.affectedRows){
            return res.json({msg:"Project Edited Succesfully"})
          }
          else{
            return res.status(401).json({msg:"Error in Project Update"});
          }
          });
  });
  
  module.exports = router;