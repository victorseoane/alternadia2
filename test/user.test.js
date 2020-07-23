const {createUser,addActivity} = require("../lib/user.js") //Ruta al fichero a importar

function checkErrorCreateUser(usName,usFirstName,usEmail,usPhone,errorMsg){
    expect(()=>{
        createUser(usName,usFirstName,usEmail,usPhone)
    }).toThrow(errorMsg)
}

function checkErrorAddActivity(user,actName,actDate,actHour,errorMsg){
    expect(()=>{
        addActivity(user,actName,actDate,actHour)
    }).toThrow(errorMsg)
}

const userNameTest = "vseoane"
const nameTest = "Victor"
const firstNameTest = "Seoane"
const emailTest = "victors@alternaenergetica.com"
const phoneTest = "605968538"
const nullNameTest = null
const nullUser = null
describe("createUser function ",()=>{

    it("works for simple case",()=>{
        const user = createUser(userNameTest,nameTest,firstNameTest,emailTest,phoneTest)
        const expectedUser = {userName:userNameTest,name:nameTest,firstName:firstNameTest,email:emailTest,phone:phoneTest,activityList:[]}
        expect(user).toEqual(expectedUser)
    })
    it("throws error for wrong parameters",()=>{
        checkErrorCreateUser(nullNameTest,firstNameTest,emailTest,phoneTest,"Wrong parameters for the user")
    })
})

describe("addActivity function ",()=>{
    const user = createUser(userNameTest, nameTest,firstNameTest,emailTest,phoneTest)
    const activityNameTest = "Work meeting"
    const activityDateTest = "23/07/2020"
    const activityHourTest = "11:30"
    it("works for simple case",()=>{
        const userWithActivity = addActivity(user,activityNameTest,activityDateTest,activityHourTest)
        const expectedUser = {userName:userNameTest, name:"Victor",firstName:"Seoane",email:"victors@alternaenergetica.com",phone:"605968538",activityList:[{name:"Work meeting",date:"23/07/2020",hour:"11:30"}]}
        expect(userWithActivity).toEqual(expectedUser)
    })
    it("throws error for null user",()=>{
        checkErrorAddActivity(nullUser,activityNameTest,activityDateTest,activityHourTest,"User is not defined")
    })
    it("throws error for wrong parameters of the activity",()=>{
        checkErrorAddActivity(user,activityNameTest,null,activityHourTest,"Wrong parameters for the new activity")
    })
})

/*describe("saveUser function ",()=>{

    it("works for simple case",()=>{
        const readString = saveUser(userNameTest,nameTest,firstNameTest,emailTest,phoneTest)
        console.log(readString)
    })

})*/