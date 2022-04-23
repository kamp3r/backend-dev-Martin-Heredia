import knex from 'knex';
import { productsKnexConfig } from '../db/config.js';

const knexInstance = knex(productsKnexConfig);

class ProductsClass {
  constructor(nameTable) {
    this.name = nameTable;
    this.init();
  }
  async init() {
    const tableBorn = await knexInstance.schema
      .hasTable(this.name)
      .then((exists) => {
        if (!exists) {
          return knexInstance.schema
            .createTable(this.name, (table) => {
              table.increments('id').primary();
              table.string('title', 50).notNullable();
              table.integer('price', 50).notNullable();
              table.string('thumbnail', 255).notNullable();
            })
            .then(() => console.log(`Table ${this.name} created!`))
            .catch((err) => console.log(err));
        }
      });
    return tableBorn;
  }
  async save(product) {
    await knexInstance(this.name)
      .insert(product)
      .then(() => console.log('Product saved!'))
      .catch((err) => console.log(err));
  }
  async getAll() {
    try {
      const result = await knexInstance.from(this.name).select('*');
      return result;
      console.log(result)
    } catch (err) {
      console.log(err);
    }
  }
  async getById(id) {
    try {
      await knexInstance.from(this.name).select('*').where('id', id).limit(1);
    } catch {
      console.log({ error: 'error' });
    }
  }
  async updateData(id, product) {
    await knexInstance(this.name)
      .where('id', id)
      .update(product)
      .then(() => console.log('Product updated!'))
      .catch((err) => console.log(err));
  }
  async deleteData(id) {
    await knexInstance(this.name)
      .where('id', id)
      .del()
      .then(() => console.log('Product deleted!'))
      .catch((err) => console.log(err));
  }
  async deleteAll() {
    await knexInstance(this.name)
      .del()
      .then(() => console.log('All products deleted!'))
      .catch((err) => console.log(err));
  }
}

export default ProductsClass;
