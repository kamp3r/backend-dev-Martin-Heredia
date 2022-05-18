import MongoHandler from "../../container/mongoHandler.js";

class ChatHandler extends MongoHandler{
    constructor(){
        super("chat", {
          author:{
            id: String,
            name: String,
            lastname: String,
            age: Number,
            nickname: String,
            avatar: String,
          },
          message: String,
          date: String,
        },{ versionKey: false });
    }
}

export default ChatHandler;