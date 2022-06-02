import mongoose from 'mongoose';
import {v4 as uuidv4} from 'uuid'
import {schema, normalize} from 'normalizr';

await mongoose.connect(process.env.DB_URL)

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

export default MongoHandler;
