const express = require( "express");

const connection = require("./db.js")
const app=express();
app.use(express.json())//used for getting JSON Object
app.use('/api/auth', require("./routes/auth.js"))


app.get('/',(req,res)=>{
    res.json("Hello Atul")
})
/*
app.get('/data',(req,res)=>{
    const q= "select * from login "
    connection.query(q,(err,data)=>{
        if(err) 
            return res.json(err)
        return res.json(data)
    })

})

app.post('/add',(req,res)=>{
    const q= "insert into demoproject.login values(?)"
    const value=[req.body.email,req.body.password,req.body.sec,req.body.ans,req.body.role]
    connection.query(q,[value],(err,data)=>{
        if(err) 
            return res.json(err)
        return res.json(data)
    })
})
*/
app.listen(8800,()=>{
    console.log("Connected to backend")
});