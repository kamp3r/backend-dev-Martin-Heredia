export default class ApiRestful{
    constructor(){
        this.container = [];
        this.counter = 0
    }
    getObjects(){
        return this.container;
    }
    getObjectById(id){
        const filterProd = this.container.filter(prod => prod.id == id);
        return filterProd
    }
    addObject(object){
        this.container.push({...object, id: this.counter++ + 1});
        return object;
    }
    deleteObjectById(id){
        const index = this.container.findIndex(prod => prod.id == id);
        if(index >= 0){
            const deleted = this.container.splice(index, 1);
            return deleted;
        }
    }
    updateObjectById(id, object){
        const updateProd = {...object, id: Number(id)};
        const index = this.container.findIndex(prod => prod.id == id);
        if(index >= 0){
            this.container[index] = updateProd;
            return updateProd;
        }
    }
}

