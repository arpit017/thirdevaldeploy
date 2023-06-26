const express =require("express")
const { Usermodel } = require("../models/Usermodel")
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")
var ip = require('ip');
require('dotenv').config()
const userrouter=express.Router()

userrouter.get("/",async(req,res)=>{
    const users=await Usermodel.find()
    res.send(users)
})


userrouter.post("/signup",async(req,res)=>{
    const{name,email,password}=req.body
    const ipname=ip.address()
    const hash = bcrypt.hashSync(password, 3);
    const new_user=new Usermodel({
        name,
        email,
        password:hash,
        IP_address:ipname
    })
    await new_user.save()
    res.send("user added")
})

userrouter.post("/login",async(req,res)=>{
    const{email,password}=req.body
const user=await Usermodel.findOne({email:email})
console.log(user)
const hash=user.password
bcrypt.compare(password, hash, function(err, result) {
    if(!result){
        res.send("login failed")
    }else{
        var token = jwt.sign({ userID:user._id }, process.env.SECRET_KEY);
        res.send({token})
    }
});

 

})

module.exports={userrouter}