const fs = require("fs")
const db = require('./db.js')
const path = require('path')

function createUser(userName,name,surname,email,phone){
    if((userName==null)||(name==null)||(surname==null)||(email==null)||(phone==null)){
        throw Error("Wrong parameters for the user")
    }
    const user = {userName:userName,name:name, surname:surname, email:email, phone:phone, activityList:[]}
    return user
}


function addActivity(user, activityName,activityDate, activityHour){
    if(user==null){
        throw Error("User is not defined")
    }
    if((activityName==null)||(activityDate==null)||(activityHour==null)){
        throw Error("Wrong parameters for the new activity")
    }
    const activity = {name:activityName, date:activityDate, hour:activityHour}
    const newUser = {...user,activityList:[...user.activityList]} //Copia de objeto con todas las keys
    newUser.activityList.push(activity)
    return newUser
}

function saveUser(dbPath,userToSave,isNew){
    let readData
    try{
         readData = db.load(dbPath) 
    }catch(e){
        console.log(e)
        throw e
    }
    if(isNew===true){
        if (readData[userToSave.userName]!=undefined) throw Error('Duplicated user')
    }

    readData[userToSave.userName]=userToSave
    db.write(readData,dbPath)
}

module.exports = {createUser,addActivity, saveUser}