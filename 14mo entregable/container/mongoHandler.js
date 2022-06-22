const mongoose =  require('mongoose');
const {v4: uuidv4} =  require('uuid');
const {schema, normalize} =  require('normalizr');

const connect = async() => {
    try{
        await mongoose.connect(process.env.DB_URL)
    }catch(err){
        console.log(err)
    }
}

connect()

class MongoHandler {
    constructor(collName, schema) {
        this.collection = mongoose.model(collName, schema);
    }

    async getAll(){
        try{
            const list = await this.collection.find();
            const chat = {
                id: 'messages',
                messages: list
            }
            const author = new schema.Entity("author")
            const post = new schema.Entity("post", { author: author }, { idAttribute: '_id' })
            const posts = new schema.Entity("posts", { posts: [post] })

            const normalizedData = normalize(chat, posts)
            return normalizedData

        }catch(err){
            console.log(err);
        }
    }
    async saveData(data){
        try{
            return await this.collection.create({_id: uuidv4(), ...data});
        }catch(err){
            console.log(err);
        }
    }
    async findById(id){
        try{
            return await this.collection.findById(id)
        }catch(err){
            console.log(err)
        }
    }
    async findOne(query){
        try{
            return await this.collection.findOne(query);
        }catch(err){
            console.log(err);
        }
    }

}

module.exports = MongoHandler;
