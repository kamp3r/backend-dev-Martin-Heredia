import mongoose from 'mongoose';
import 'dotenv/config'
import {schema, normalize} from 'normalizr';

const URL = process.env.DB_URL;

await mongoose.connect(URL)

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
            return await this.collection.create(data);
        }catch(err){
            console.log(err);
        }
    }

}

export default MongoHandler;
