const express = require("express");
const router = express.Router();
const connection = require("../db");



router.post("/", async (req, res) => {
    const title=req.body.title;
    const domain=req.body.domain;
    const technology_used=req.body.technology_used;
    const start_date=req.body.start_date;
    const end_date=req.body.end_date;
    const status="Assigned";
    const std_id=req.body.std_id;
    const teacher_id=req.body.teacher_id;
    const sem=req.body.sem;
    const date= new Date()
    const q1="INSERT INTO `project` (`title`, `domain`, `technology_used`, `start_date`, `end_date`, `status`)VALUES (?,?,?,?,?,?);"
    const q2="SELECT CONCAT('P',MAX(CAST(SUBSTRING(project_id, 2) AS UNSIGNED))) as pid FROM project;";
    connection.query(q1, [title,domain,technology_used,start_date,end_date,status], (err, data) => {
        if (err) {
          return res.json({ err});
        }
        connection.query(q2,(err, data1) => {
            if (err) {
              return res.json({ err});
            }
            const project_id=data1[0].pid;
            console.log(project_id)
            const q3="Insert into project_allocation values(?,?,?,?,?,?)"
            connection.query(q3,[std_id+"_"+project_id,std_id,teacher_id,project_id,date,sem],(err,data2)=>{
                if (err) {
                    return res.json({ err});
                  }
                  if (data2.affectedRows !== 0) {
                    console.log("Login added successfully");
                    return res.json({ msg: "Project Alloted Succesfully" });
                  }
            });
        });
    
});
});

module.exports = router;
