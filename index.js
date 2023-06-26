const express=require("express")
const { connection } = require("./config/db")
const {userrouter}=require("./routes/userroutes")
require('dotenv').config()
const {todorouter}=require("./routes/todorouter")
const jwt = require("jsonwebtoken")
const cors=require("cors")
const app =express()


app.use(express.json())
app.use(cors())

const authenticate=(req,res,next)=>{
    const token =req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.send("not logged in")
    }
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if(err){
        res.send("not logged in")
      }else{
        const {userID}=decoded
        req.userID=userID
        next()
      }
      });

}

app.use("/users",userrouter)
app.use("/todo",authenticate,todorouter)

app.get("/",(req,res)=>{
    res.send("home")
})


app.listen(process.env.PORT,async(req,res)=>{
    try{
await connection
console.log("dbs connected")
    }catch(err){
        console.log("dbs not connected")
        console.log(err)
    }
})