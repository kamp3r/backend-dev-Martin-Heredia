import { chatKnexConfig } from '../db/config.js';
import knex from 'knex';

const knexChat = knex(chatKnexConfig);

class ChatHandler {
  constructor(db) {
    this.table = db;
    this.init()
  }
  async init(){
    const tableBorn = await knexChat.schema.hasTable(this.table).then((exists) => {
      if (!exists) {
        return knexChat.schema.createTable(this.table, (table) => {
            table.increments('id').primary();
            table.string('sender', 50).notNullable();
            table.string('msg', 255).notNullable();
            table.string('date', 255).notNullable();
          })
          .then(() => console.log(`Table ${this.table} created!`))
          .catch((err) => console.log(err));
      }
    });
    return tableBorn;
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
      await knexChat(this.table).insert(message);
    } catch (err) {
      console.log(err);
    }
  }
}

export default ChatHandler;