function createUser(name,firstName,email,phone){
    if((name==null)||(firstName==null)||(email==null)||(phone==null)){
        throw Error("Wrong parameters for the user")
    }
    const user = {name:name, firstName:firstName, email:email, phone:phone, activityList:[]}
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

module.exports = {createUser,addActivity}