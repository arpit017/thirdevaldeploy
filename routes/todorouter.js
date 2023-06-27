const express =require("express")
const { Usermodel } = require("../models/Usermodel")
const {Todomodel}=require("../models/Todomodel")
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")

const todorouter=express.Router()

todorouter.get("/",async(req,res)=>{
const userID=req.userID
const query=req.query
query.userID=userID

// console.log(query)
const todos=await Todomodel.find(query)
res.send(todos)
    
})

todorouter.post("/create",async(req,res)=>{
const{taskname,status,tag}=req.body
const userID=req.userID
const new_todo=new Todomodel({
    taskname,
    status,
    tag,
    userID:userID
})
await new_todo.save()
res.send("todo created")
})

todorouter.delete("/delete/:todoID",async(req,res)=>{
     const {todoID}=req.params
     const todo=await Todomodel.findOne({_id:todoID})
   
     const userID=req.userID
     const result=await Todomodel.findOneAndDelete({_id:todoID,userID:userID})
     if(!result){
        res.send("not correct user")
     }else{
        res.send("deleted")
     }
})

todorouter.patch("/edit/:todoID",async(req,res)=>{
   console.log("aaya bhai")
    const {todoID}=req.params
    const updtaedData=req.body
    const todo=await Todomodel.findOne({_id:todoID})
  
    const userID=req.userID
    const result=await Todomodel.findOneAndUpdate({_id:todoID,userID:userID},(updtaedData))
    if(!result){
       res.send("not correct user")
    }else{
       res.send("updated")
    }
})




module.exports={todorouter}