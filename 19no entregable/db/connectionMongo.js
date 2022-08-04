const mongoose = require('mongoose');
const logger = require("../utils/logger/logger.js");

let instanceMongoConnection = null;

class MongoDB{
    constructor(uri){
        this.uri = uri;
    }
    static getConnectionInstance(uri){
        if(!instanceMongoConnection){
            instanceMongoConnection = new MongoDB(uri);
        }
        return instanceMongoConnection;
    }
    async connect(){
        try{
           const connect = await mongoose.connect(this.uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            logger.info('Database connected');
            return connect;
        }catch(err){
            logger.error('Database connection error', err);
        }
    }
}

module.exports = MongoDB;