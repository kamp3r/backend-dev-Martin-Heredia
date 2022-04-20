import { promises as fs} from 'fs';
const date = new Date(Date.now());

class ProductHandler {
    constructor(route){
        this.way = route
    }
    async getAllProducts(){
        try{
            const objects = await fs.readFile(this.way, 'utf-8')
            return JSON.parse(objects)
        }catch{
            return []
        }
    }
    async save(obj){
        const objts = await this.getAllProducts()
        let assignId;
        if (objts.length == 0){
            assignId = 1
        } else{
            assignId = objts[objts.length -1].id +1
        }
        const objectSave = {id: assignId,...obj, date: date.toString()}
        objts.push(objectSave)
        try{
            await fs.writeFile(this.way, JSON.stringify(objts, null, 2))
            return assignId
        } catch{
            return {error: `Ocurrio un error al guardar el datos en el archivo`}
        }
    }
    async getById(id){
        try{
            const objects = await this.getAllProducts()
            const object = objects.find(obj => obj.id == id)
            return object ? object : undefined
        }catch{
            console.error('Error')
        }
    }
    async updateProductById(id, obj){
        const objects = await this.getAllProducts()
        const object = objects.find(obj => obj.id == id)
        if(object){
            const index = objects.indexOf(object)
            objects[index] = {...object, date: date.toString(), ...obj}
            try{
                await fs.writeFile(this.way, JSON.stringify(objects, null, 2))
                return objects[index]
            } catch{
                return `Ocurrio un error al guardar el datos en el archivo${err}`
            }
        }
    }
    async deleteProductById(id){
        const objects = await this.getAllProducts()
        const object = objects.find(obj => obj.id == id)
        const objectDeleted = object
        if(object){
            const index = objects.indexOf(object)
            objects.splice(index, 1)
            try{
                await fs.writeFile(this.way, JSON.stringify(objects, null, 2))
                return objectDeleted
            } catch{
                return `Ocurrio un error al guardar el datos en el archivo${err}`
            }
        }
    }
}

export default ProductHandler;
