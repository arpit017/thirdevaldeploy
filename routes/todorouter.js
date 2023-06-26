const express =require("express")
const { Usermodel } = require("../models/Usermodel")
const {Todomodel}=require("../models/Todomodel")
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")

const todorouter=express.Router()

todorouter.get("/",async(req,res)=>{
const userID=req.userID
const {taskname,status,tag}=req.query
if(taskname){
    const todos=await Todomodel.find({takname:taskname,userID:userID})
    res.send(todos)
}else if(status){
    const todos=await Todomodel.find({status:status,userID:userID})
    res.send(todos)
}else if(tag){
    const todos=await Todomodel.find({tag:tag,userID:userID})
    res.send(todos)
}else{
    const todos=await Todomodel.find({userID:userID})
    res.send(todos)
}


    
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