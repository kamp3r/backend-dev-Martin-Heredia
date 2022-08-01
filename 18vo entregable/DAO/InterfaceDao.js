class InterfaceDao{
    constructor(){}

    async create(data){
        throw new Error('Not implemented');
    }
    async readAll(){
        throw new Error('Not implemented');
    }
    async readOne(id){
        throw new Error('Not implemented');
    }
    async update(id, data){
        throw new Error('Not implemented');
    }
    async delete(id){
        throw new Error('Not implemented');
    }
    async deleteAll(){
        throw new Error('Not implemented');
    }
}

module.exports = InterfaceDao;