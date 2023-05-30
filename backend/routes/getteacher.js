const express = require("express");
const router = express.Router();
const connection = require("../db");
const fetchid= require("../middleware/getId")


router.post('/',fetchid, async (req, res) => {
    const prn=req.userid;
    const q1='select * from teacher where teacher_id=?;';
    connection.query(q1, [prn], (err, data) => {
        if (err) {
            console.log(err.message)
          return res.json(err);
        }
          return res.json(data)
        });
});

module.exports = router;