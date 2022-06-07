import mongoose from 'mongoose';
import configDB from '../config/configDB.js';
import { v4 as uuidv4 } from 'uuid';

const URL = configDB.mongodb.url;

await mongoose.connect(URL);

class MongoHandler {
  constructor(collName, schema) {
    this.collection = mongoose.model(collName, schema);
  }
  async readAll() {
    try {
      const data = await this.collection.find();
      return data;
    } catch (err) {
      console.error(err);
    }
  }
  async getById(id) {
    try {
      const data = await this.collection.findById(id);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
  async save(obj) {
    try {
      const date = new Date().toISOString();
      const object = { ...obj, timestamp: new Date().toISOString(), _id: uuidv4() };
      const data = await this.collection.create(object);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
  async updateElement(id, element) {
    try {
      const data = await this.collection.findByIdAndUpdate(id, element);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
  async deleteElement(id) {
    try {
      const data = await this.collection.findByIdAndDelete(id);
      return data;
    } catch (err) {}
  }
  async deleteAll() {
    try {
      const data = await this.collection.deleteMany({});
      return data;
    } catch (err) {
      console.error(err);
    }
  }
  async addByid(id, obj) {
    try {
      const data = await this.readAll();
      const cart = data.find((cart) => cart.id == id);
      if (cart) {
        cart.products.push(obj);
        await this.updateElement(id, cart);
        return cart;
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
    }
  }
  async deleteByIdfromCart(idCart, idProduct) {
    try {
        const data = await this.readAll();
        const cart = data.find((cart) => cart._id == idCart);
        if(cart){
            const product = cart.products.find((product) => product._id == idProduct);
            if(product){
                cart.products.splice(cart.products.indexOf(product), 1);
                await this.updateElement(idCart, cart);
                return cart;
            }else{
                return null;
            }
        }
    } catch (err) {
      console.error(err);
    }
  }
}

export default MongoHandler;
