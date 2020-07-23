const fs = require('fs')

const db = {
    load: (path)=>{
        try{
            const contents = fs.readFileSync(path)
            const parsedDb = JSON.parse(contents)
            return parsedDb
        }catch(error){
            if(error.code === 'ENOENT'){
                console.log(`Couldn!t find ${path}`)
                return {}
            } else{
                throw error
            }
        }
    },
    write: (user,path, loadedDb)=>{
        const userString = JSON.stringify(user)
        fs.writeFileSync(path,userString)
    }
}

module.exports = db