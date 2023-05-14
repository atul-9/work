const express= require("express");
const router=express.Router();

router.get('/',(req,res)=>
{
    obj={
        a:"Atul",
        vallue:12
    }
    res.json(obj)
})

module.exports=router