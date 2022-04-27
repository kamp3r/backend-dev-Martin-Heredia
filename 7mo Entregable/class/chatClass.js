import { chatKnexConfig } from '../db/config.js';
import knex from 'knex';

const knexChat = knex(chatKnexConfig);

class ChatHandler {
  constructor(db) {
    this.table = db;
    this.init()
  }
  async init() {
    try {
      const tableBorn = await knexChat.schema.hasTable(this.table);
      if (!tableBorn) {
        await knexChat.schema.createTable(this.table, (table) => {
          table.increments('id').primary();
          table.string('sender', 80).notNullable;
          table.string('msg', 255).notNullable();
          table.string('date', 255).notNullable;
        });
        console.log('Table created!');
        return tableBorn;
      }
    } catch (err) {
      console.log(err);
    }
  }
  async getAllFrom() {
    try {
      const result = await knexChat.from(this.table).select('*');
      return result;
    } catch (err) {
      console.log(err);
    }
  }
  async saveChat(message) {
    try {
      const msg = await knexChat(this.table).insert(message);
      return msg
    } catch (err) {
      console.log(err);
    }
  }
}

export default ChatHandler;