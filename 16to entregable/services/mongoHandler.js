const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const { connect } = require('../db/index.db');

connect();

class MongoHandler {
  constructor(collectionName, schema) {
    this.collection = mongoose.model(collectionName, schema);
  }
  async saveData(data) {
    try {
      return await this.collection.create({
        ...data,
        _id: uuidv4(),
      });
    } catch (err) {
      console.error(err);
    }
  }
  async findOne(query) {
    try {
      return await this.collection.findOne(query);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = MongoHandler;
