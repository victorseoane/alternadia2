const express = require('express')
const bodyParser = require('body-parser')
const {addActivity,saveUser,getUsers,getUser,deleteUser, editUser, deleteActivity} = require('../user.js')
const path = require('path')
const { read } = require('fs')

const pathDB = path.resolve(__dirname,'../../db/users.json')
const app = express()
app.use(bodyParser.json())

app.get('/user/:username', (req,res)=>{
    const user = getUser(pathDB,req.params.username)
    res.send(user)
})

app.get('/users',(req,res)=>{
    const users = getUsers(pathDB)
    res.send(users)
})


app.post('/user/add',(req,res)=>{
    try{
        const newUser = saveUser(pathDB,req.body,true)
        res.send(newUser)
    } catch(err){
        res.send('Duplicated user')
    }
})
app.post('/user/:username/delete',(req,res)=>{
    try{
        const msg = deleteUser(pathDB,req.params.username)
        res.send(msg)
    }catch(err){
        res.send('User does not exist')
    }

})
app.post('/user/:username/edit',(req,res)=>{
    try{
        const editedUser = editUser(pathDB,req.params.username,req.body)
        res.send(editedUser)
    }catch(err){
        res.send('User does not exist')
    }

})

app.post('/activity/:username/add',(req,res)=>{
    try{
        const user = getUser(pathDB,req.params.username)
        const newUser = addActivity(user,req.body.name,req.body.date,req.body.hour)
        const savedUser = saveUser(pathDB,newUser,false)
        res.send(savedUser)
    }catch(error){
        res.send(error)
    }
})

app.post('/activity/:username/:activityName/delete',(req,res)=>{
    try{
        const user = getUser(pathDB,req.params.username)
        const newUser = deleteActivity(user,req.params.activityName)
        const savedUser = saveUser(pathDB,newUser,false)
        res.send(savedUser)
    }catch(error){
        res.send(error.msg)
    }
})

app.post('/activity/:username/:activityName/edit',(req,res)=>{
    try{
        const editedUser = editUser(pathDB,req.params.username,req.body)
        res.send(editedUser)
    }catch(err){
        res.send('User does not exist')
    }
})
app.listen(8000)