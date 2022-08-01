const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const bcrypt = require('bcrypt');
const InterfaceDao = require('../InterfaceDao');
const { User } = require('../../models/user');
const MongoDBConnection = require('../../db/connectionMongo');
const URI = require('../../db/uriDB');

let instance = null;

class MongoDB extends InterfaceDao {
    constructor(){
        super()
        this.collection = User;
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
        if(data.email){
            const user = await this.collection.findOne({email: data.email})
            if(user){
                throw new Error('User already exists')
            }
        }
        const hashed = await bcrypt.hash(data.password, 10)
        const user = await this.collection.create({
            _id: uuidv4(),
            ...data,
            password: hashed,
            createdAt: new Date(),
        })
        delete user._doc.password
        return user
    }
    async readOne(email){
        const user = await this.collection.findOne({email: email})
        if(!user){
            throw new Error('User not found')
        }
        return {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            password: user.password,
            email: user.email,
            address: user.address,
            phone: user.phone,
            createdAt: moment(user.createdAt).format('DD-MM-YYYY HH:mm:ss'),
        }
    }
    async update(id, data){
        const user = await this.collection.findById(id)
        if(!user){
            throw new Error('User not found')
        }
        await user.updateOne({$set: data})
        return {message: 'User updated'}
    }
    async delete(id){
        const user = await this.collection.findOneAndDelete({_id: id})
        if(!user){
            throw new Error('User not found')
        }
        return {message: 'User deleted'}
    }
}

module.exports = MongoDB