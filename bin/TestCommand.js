const stdio = require('stdio')

gatherData().then((res)=>{
    console.log(res)
}).catch((error)=>{
    console.log(error)
})


async function gatherData(){
    throw Error('fdssdfsdfds')
    const answer = await stdio.ask('Question?')
    const answer2 = await stdio.ask('Question2')
    return {answer,answer2}
}


