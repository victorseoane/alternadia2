const stdio = require('stdio')
const path = require('path')
const { createUser, saveUser } = require('../lib/user')

const pathDB = path.resolve(__dirname,'../db/users.json')

gatherData().then((res)=>{
    const user = createUser(res.answer,res.answer2,res.answer3,res.answer4,res.answer5)
    saveUser(pathDB,user)
}).catch((error)=>{
    console.log(error)
})


async function gatherData(){
    const answer = await stdio.ask('Introduce the username')
    const answer2 = await stdio.ask('Introduce the name of the user')
    const answer3 = await stdio.ask('Introduce the surnames of the user')
    const answer4 = await stdio.ask('Introduce the email of the user') 
    const answer5 = await stdio.ask('Introduce the phone number of the user')
    return {answer,answer2,answer3,answer4,answer5}
}


