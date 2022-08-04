const InterfaceDao = require('../InterfaceDao');
const {sendDeliveryMail} = require('../../utils/mail/mailsender')
const { Order } = require('../../models/order');
const MongoDBConnection = require('../../db/connectionMongo');
const URI = require('../../db/uriDB');

let instance = null;

class MongoDB extends InterfaceDao {
    constructor(){
        super()
        this.collection = Order;
        this.connectDB()
    }
    static getInstance(){
        if(!instance){
            instance = new MongoDB()
        }
        return instance
    }
    async connectDB(){
        const database = await MongoDBConnection.getConnectionInstance(URI);
        await database.connect();
    }
    async create(data){
        const order = await this.collection.create(data)
        await sendDeliveryMail(data)
        return order
    }
}

module.exports = MongoDB;