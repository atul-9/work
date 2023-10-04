const express = require("express");
const router = express.Router();
const connection = require("../db");

router.get('/', async (req, res) => {
    const q1='select distinct(department) from student ;';
    connection.query(q1, (err, data) => {
        if (err) {
            console.log(err.message)
          return res.json(err);
        }
        var dep=[];
        for(var i =0;i< data.length;i++){
                dep[i]={
                    id: i,
                    name:data[i].department
                }
        }
          return res.json(dep)
        });
});

module.exports = router;