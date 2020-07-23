const {createUser,addActivity,saveUser} = require("../lib/user.js")
const db = require("../lib/db.js") 
const path = require('path')
const fs = require('fs')


function checkErrorCreateUser(usName,usSurname,usEmail,usPhone,errorMsg){
    expect(()=>{
        createUser(usName,usSurname,usEmail,usPhone)
    }).toThrow(errorMsg)
}

function checkErrorAddActivity(user,actName,actDate,actHour,errorMsg){
    expect(()=>{
        addActivity(user,actName,actDate,actHour)
    }).toThrow(errorMsg)
}

const usernameTest = ['vseoane','elenam']
const nameTest= ['Victor','Elena']
const surnameTest= ['Seoane','Marco']
const emailTest= ['victors@alternaenergetica.com','elenam@alternaenergetica.com']
const phoneTest = ['605968538','654978975']

const user1 = createUser(usernameTest[0],nameTest[0],surnameTest[0],emailTest[0],phoneTest[0])
const user2 = createUser(usernameTest[1],nameTest[1],surnameTest[1],emailTest[1],phoneTest[1])

const nullnameTest = null
const nullUser = null
describe("createUser function ",()=>{

    it("works for simple case",()=>{
        const expectedUser = {userName:usernameTest[0],name:nameTest[0],surname:surnameTest[0],email:emailTest[0],phone:phoneTest[0],activityList:[]}
        expect(user1).toEqual(expectedUser)
    })
    it("throws error for wrong parameters",()=>{
        checkErrorCreateUser(nullnameTest,surnameTest[0],emailTest[0],phoneTest[0],"Wrong parameters for the user")
    })
})

describe("addActivity function ",()=>{
    const activitynameTest = "Work meeting"
    const activityDateTest = "23/07/2020"
    const activityHourTest = "11:30"
    it("works for simple case",()=>{
        const userWithActivity = addActivity(user1,activitynameTest,activityDateTest,activityHourTest)
        const expectedUser = {...user1,activityList:[{name:"Work meeting",date:"23/07/2020",hour:"11:30"}]}
        expect(userWithActivity).toEqual(expectedUser)
    })
    it("throws error for null user",()=>{
        checkErrorAddActivity(nullUser,activitynameTest,activityDateTest,activityHourTest,"User is not defined")
    })
    it("throws error for wrong parameters of the activity",()=>{
        checkErrorAddActivity(user1,activitynameTest,null,activityHourTest,"Wrong parameters for the new activity")
    })
})

describe("saveUser function ",()=>{
    const pathTest = path.resolve(__dirname,'../db/emptyExample.json')

    it("works when DB is empty",()=>{
        saveUser(pathTest,user1,true)
        const readUser = db.load(pathTest)
        expect(readUser[usernameTest[0]]).toEqual(user1)
        fs.unlinkSync(pathTest)
    })

    it("works with multiple users",()=>{
        saveUser(pathTest,user1,true)
        saveUser(pathTest,user2,true)
        const readUser = db.load(pathTest)
        expect(readUser[usernameTest[0]]).toEqual(user1)
        expect(readUser[usernameTest[1]]).toEqual(user2)
        fs.unlinkSync(pathTest)
    })

    it("throws error when user is repeated",()=>{
        expect(()=>{
            saveUser(pathTest,user1,true)
            saveUser(pathTest,user1,true)
        }).toThrow('Duplicated user')
        fs.unlinkSync(pathTest)
    })

})