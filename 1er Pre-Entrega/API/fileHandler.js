import { promises as fs } from 'fs';

class FileHandler {
    constructor(route){
        this.way = route;
    }
    async getAllFrom(){
        try{
            const objects = await fs.readFile(this.way, 'utf-8')
            return JSON.parse(objects)
        }catch{
            return `No se encontraron objectos en el archivo`
        }
    }
    async getById(id){
        try{
            const objects = await this.getAllFrom()
            const filterProduct = objects.filter(prod => prod.id == id)
            return filterProduct
        }catch{
            return `No se encontró el producto con el id ${id}`
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
        } catch{
            return `Ocurrio un error al guardar el datos en el archivo`
        }
    }
    async updateProductById(id, obj){
        try{
            const objects = await this.getAllFrom()
            const index = objects.findIndex(prod => prod.id == id)
            if(index >= 0){
                const updateProduct = {...obj, id: Number(id)}
                objects[index] = updateProduct
                await fs.writeFile(this.way, JSON.stringify(objects, null, 2))
                return updateProduct
            }
        }catch{
            return `No se encontró el producto con el id ${id}`
        }
    }
    async deleteProductById(id){
        try{
            const objects = await this.getAllFrom()
            const index = objects.findIndex(prod => prod.id == id)
            if(index >= 0){
                const deleted = objects.splice(index, 1)
                await fs.writeFile(this.way, JSON.stringify(objects, null, 2))
                return deleted
            }
        }catch{
            return `No se pudo borrar el producto con el id ${id}`
        }
    }
}

export default FileHandler;