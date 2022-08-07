const InterfaceDao = require('../InterfaceDao');
const {sendDeliveryMail} = require('../../utils/mail/mailsender')

let instance = null;

class Memory extends InterfaceDao{
    constructor(){
        super();
        this.collection = [];
    }
    static getInstance(){
        if (!instance){
            instance = new Memory();
        }
        return instance;
    }
    async create(data){
        const newOrder = {
            products: data.products,
            email: data.email,
            amount: data.amount,
            address: data.address,
            status: data.status,
            userId: data.userId,
        };
        await sendDeliveryMail(data)
        await this.collection.push(newOrder);
        return newOrder;
    }
}

module.exports = Memory;