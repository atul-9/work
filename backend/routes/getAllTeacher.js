const express = require("express");
const router = express.Router();
const connection = require("../db");

router.get('/', async (req, res) => {
    const q1='select * from teacher where status =1;';
    connection.query(q1, (err, data) => {
        if (err) {
            console.log(err.message)
          return res.json(err);
        }
          return res.json(data)
        });
});

module.exports = router;