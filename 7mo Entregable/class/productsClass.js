import knex from 'knex';
import { productsKnexConfig } from '../db/config.js';

const knexInstance = knex(productsKnexConfig);

class ProductsClass {
  constructor(nameTable) {
    this.name = nameTable;
    this.init();
  }
  async init() {
    try {
      const tableBorn = await knexInstance.schema.hasTable(this.name);
      if (!tableBorn) {
        await knexInstance.schema.createTable(this.name, (table) => {
          table.increments('id').primary();
          table.string('title', 100).notNullable;
          table.integer('price', 100).notNullable();
          table.string('thumbnail', 255).notNullable;
        });
        console.log('Table created!');
        return tableBorn;
      }
    } catch (err) {
      console.log(err);
    }
  }
  async save(product) {
    try {
      const item = await knexInstance(this.name).insert(product);
      return item;
    } catch (err) {
      console.log(err);
    }
  }
  async getAll() {
    try {
      const result = await knexInstance.from(this.name).select('*');
      return Object.values(JSON.parse(JSON.stringify(result)));
    } catch (err) {
      console.log(err);
    }
  }
  async getById(id) {
    try {
      const result = await knexInstance
        .from(this.name)
        .select('*')
        .where('id', id)
        .limit(1);
      return result;
    } catch {
      console.log({ error: 'error' });
    }
  }
  async updateData(id, product) {
    try {
      const productUpdate = await knexInstance(this.name)
        .where('id', id)
        .update(product);
      return productUpdate;
    } catch {
      console.log({ error: 'error' });
    }
  }
  async deleteData(id) {
    try {
      const itemDeleted = await knexInstance(this.name).where('id', id).del();
      return itemDeleted;
    } catch {
      console.log({ error: 'error' });
    }
  }
  async deleteAll() {
    try {
      const trashAll = await knexInstance(this.name).del();
      return trashAll;
    } catch {
      console.log({ error: 'error' });
    }
  }
}

export default ProductsClass;
