const fs = require('fs')

class Contenedor{
    constructor(fileName){
        this.file = fileName
        this.counterId = 0
        this.list = []
    }
    async write(){
        try{
            const str = JSON.stringify(this.list);
            await fs.promises.writeFile(this.file, str)
        }catch{
            console.error('Cannot write this file')
        }
    }
    async save(object){
        try{
            object["id"] = this.counterId++ +1;
            this.list.push(object)
            await this.write()
            console.log(`El id del objeto asignado es: ${object["id"]}`)
        }
        catch{
            console.error('Cannot save this object')
        }
    }
    async getById(id){
        try{
            const getData = await fs.promises.readFile(`./${this.file}`, 'utf-8')
            const txtData = JSON.parse(getData)
            const objectIdentified = txtData.find((obj)=> obj.id === id)
            return objectIdentified
        }catch{
            console.error('Cannot find this ID')
        }
    }    
    async getAll(){
        try{
            const getData = await fs.promises.readFile(`./${this.file}`, 'utf-8')
            const txtData = JSON.parse(getData)
            return txtData
        }catch{
            console.error('Cannot get elements')
        }
    }    
    async deleteById(id){
        try{
            const getData = await fs.promises.readFile(`./${this.file}`, 'utf-8')
            const txtData = JSON.parse(getData)
            const indexObj = txtData.findIndex((obj)=> obj.id === id)
            if (indexObj != -1){
                txtData.splice(indexObj, 1)
                this.list = txtData
                this.write()
                console.log(txtData)
            }
        }catch{
            console.error('Cannot find this ID to be deleted')
        }
    }
    async deleteAll(){
        try{
            await this.write()
            console.log('All objects has been')
        }
        catch{
            console.error('Cannot delete all objects')
        }
    }
}

module.exports = Contenedor