const express= require("express");

const router=express.Router();

const connection=require("../db")
const bcrypt=require("bcryptjs")

const salt=bcrypt.genSalt(10)


router.post('/',async (req,res)=>
{   
    const email=req.body.email;
    const salt=await bcrypt.genSalt(10);
    const secpass= await bcrypt.hash(req.body.pass,salt);
    const pass= req.body.pass;
    console.log(pass);
    q="select * from login where email=? and password=?"
    connection.query(q,[email,pass],(err,data)=>{
        if(err) 
            return res.json(err)
        return res.json(data)
    })
})

module.exports=router