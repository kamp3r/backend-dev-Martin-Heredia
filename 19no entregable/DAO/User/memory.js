const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const bcrypt = require('bcrypt');
const InterfaceDao = require('../InterfaceDao');
const UserDTO = require('../../dto/userDTO');

let instance = null;

class Memory extends InterfaceDao {
    constructor() {
        super();
        this.collection = [];
    }
    static getInstance() {
        if (!instance) {
        instance = new Memory();
        }
        return instance;
    }
    async create(data){
        const verifyUser = await this.collection.find(user => user.email === data.email);
        if(verifyUser){
                throw new Error('User already exists');
            
        }else{
        const password = await bcrypt.hash(data.password, 10);
        const user = {
            _id: uuidv4(),
            ...data,
            password: password,
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        };
        await this.collection.push(user);
        return user;
    }
    }
    async readOne(email){
        const user = await this.collection.filter(user => user.email === email);
        if (!user) {
            throw new Error('User not found');
        }
        return user[0];
    }
    async update(id, data){
       const user = await this.collection.filter(user => user._id === id);
        if (!user) {
            throw new Error('User not found');
        }
        if (data.password.length > 0) {
            const hashed = await bcrypt.hash(data.password, 10);
            const updateUser = await Object.assign(user[0], {
                ...data,
                password: hashed,
            });
            return updateUser;
        }else{
            delete data.password;
            const updateUser = await Object.assign(user[0], data);
            return updateUser;
        }
    }
    async delete(id){
        const user = await this.collection.filter(user => user._id === id);
        if (!user) {
            throw new Error('User not found');
        }
        const index = this.collection.indexOf(user);
        this.collection.splice(index, 1);
        return { message: 'User deleted' };
    }
}

module.exports = Memory;