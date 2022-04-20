import { promises as fs} from 'fs';
const date = new Date(Date.now());

class CartHandler{
    constructor(route){
        this.file = route
    }
    async getAll(){
        try{
            const objects = await fs.readFile(this.file, 'utf-8')
            return JSON.parse(objects)
        }catch{
            return []
        }
    }
    async getCartById(id){
        let data = await this.getAll()
        let index = data.findIndex(cart => cart.id == id)
        if(index != -1){
            return data[index]
        }else{
            return {error: `No se encontro el carrito`}
        }
    }
    async createCart(){
        let data = await this.getAll()
        let id
        console.log(data.length)
        if(data.length == 0){
            id = 1
        }else{
            id = data[data.length -1].id +1
        }
        const cartArr = [...data, {id, date: date.toString(), products: []}]
        try{
            await fs.writeFile(this.file, JSON.stringify(cartArr, null, 2))
            return id
        }catch{
            return {error: `No se pudo crear el carrito`}
        }
    }
    async addByid(id, obj){
        let data = await this.getAll()
        let index = data.findIndex(cart => cart.id == id)
        if(index != -1){
            data[index].products.push(obj)
            try{
                await fs.writeFile(this.file, JSON.stringify(data, null, 2))
                return data[index]
            }catch{
                return {error: `No se pudo agregar el producto al carrito`}
            }
        }
    }
    async deleteCartById(id){
        let data = await this.getAll()
        let index = data.findIndex(cart => cart.id == id)
        if(index != -1){
            data.splice(index, 1)
            try{
                await fs.writeFile(this.file, JSON.stringify(data, null, 2))
                return data
            }catch{
                return {error: `No se pudo eliminar el carrito`}
            }
        }
    }
    async deleteProductById(id, productId){
        let data = await this.getAll()
        let index = data.findIndex(cart => cart.id == id)
        if(index != -1){
            let productIndex = data[index].products.findIndex(product => product.id == productId)
            if(productIndex != -1){
                data[index].products.splice(productIndex, 1)
                try{
                    await fs.writeFile(this.file, JSON.stringify(data, null, 2))
                    return data[index]
                }catch{
                    return {error: `No se pudo eliminar el producto del carrito`}
                }
            }
        }
    }
}

export default CartHandler