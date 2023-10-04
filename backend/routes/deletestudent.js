const express = require("express");
const router = express.Router();
const connection = require("../db");

router.post('/', async (req, res) => {
    const prn=req.body.prn;
    const sql = `update student set status=0 WHERE prn = ? `;
    connection.query(sql, [prn],(err, data) => {
        if (err) {
            console.log(err.message)
          return res.json(err);
        }
          return res.json(data)
        });


});
  
module.exports = router;