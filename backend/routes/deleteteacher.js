const express = require("express");
const router = express.Router();
const connection = require("../db");

router.post('/', async (req, res) => {
    const teacher_id=req.body.teacher_id;
    const sql = `update teacher set status=0 WHERE teacher_id = ? `;
    connection.query(sql, [teacher_id],(err, data) => {
        if (err) {
            console.log(err.message)
          return res.json(err);
        }
          return res.json(data)
        });


});
  
module.exports = router;