const boom = require('@hapi/boom');
const MongoHandler = require('../../services/mongoHandler');

class ChatHandler extends MongoHandler {
  constructor() {
    super(
      'chat',
      {
        author: {
          id: String,
          name: String,
          lastname: String,
          age: Number,
          nickname: String,
          avatar: String,
        },
        message: String,
        date: String,
        _id: String,
      },
      { versionKey: false }
    );
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
        throw boom.notFound('There is no list of messages to retrieve');
    }
}
}

module.exports = ChatHandler;
