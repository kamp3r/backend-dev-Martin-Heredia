const { promises: fs } = require ('fs') // equivalente a 'promises as'

class FileHandler {
    constructor(route){
        this.way = route;
    }

    async getAllFrom(){
        try{
            const objects = await fs.readFile(this.way, 'utf-8')
            return JSON.parse(objects)
        }catch(err){
            return []
        }
    }
    async save(obj){
        const objts = await this.getAllFrom()
        let assignId;
        if (objts.length == 0){
            assignId = 1
        } else{
            assignId = objts[objts.length -1].id +1
        }
        const objectSave = { ...obj, id: assignId}
        objts.push(objectSave)
        try{
            await fs.writeFile(this.way, JSON.stringify(objts, null, 2))
            return assignId
        } catch (err){
            return `Ocurrio un error al guardar el datos en el archivo${err}`
        }
    }
}

module.exports = FileHandler;