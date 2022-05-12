import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

class FileHandler {
  constructor(path) {
    this.path = path;
  }
  async readAll() {
    try {
      const data = await fs.readFile(this.path, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }
  async getById(id) {
    try {
      const data = await this.readAll();
      const elem = data.find((elem) => elem.id == id);
      return elem ? elem : undefined;
    } catch (err) {
      console.error(err);
    }
  }
  async save(obj) {
    const objts = await this.readAll();
    const objectSave = { ...obj, id: uuidv4(), timestamp: new Date().toISOString() };
    objts.push(objectSave);
    try {
      await fs.writeFile(this.path, JSON.stringify(objts, null, 2));
      return objectSave;
    } catch (err) {
      console.error(err);
    }
  }
  async updateElement(id, element) {
    try {
      const data = await this.readAll();
      const index = data.findIndex((elem) => elem.id === id);
      data[index] = { ...element, id };
      const dataStr = JSON.stringify(data);
      await fs.writeFile(this.path, dataStr, 'utf8');
      return element;
    } catch (err) {
      console.error(err);
    }
  }
  async deleteElement(id) {
    try {
      const data = await this.readAll();
      const index = data.findIndex((elem) => elem.id === id);
      data.splice(index, 1);
      const dataStr = JSON.stringify(data);
      await fs.writeFile(this.path, dataStr, 'utf8');
      return data;
    } catch (err) {
      console.error(err);
    }
  }
  async deleteAll() {
    try {
      const data = [];
      const dataStr = JSON.stringify(data);
      await fs.writeFile(this.path, dataStr, 'utf8');
      return data;
    } catch (err) {
      console.error(err);
    }
  }
  async addByid(id, obj) {
    let data = await this.readAll();
    let index = data.findIndex((cart) => cart.id == id);
    if (index != -1) {
      data[index].products.push(obj);
      try {
        await fs.writeFile(this.path, JSON.stringify(data, null, 2));
        return data[index];
      } catch (err) {
        console.error(err);
      }
    }
  }
  async deleteByIdfromCart(idCart, idProduct) {
    let data = await this.readAll();
    let index = data.findIndex((cart) => cart.id == idCart);
    if (index != -1) {
      let indexProduct = data[index].products.findIndex(
        (product) => product.id == idProduct
      );
      if (indexProduct != -1) {
        data[index].products.splice(indexProduct, 1);
        try {
          await fs.writeFile(this.path, JSON.stringify(data, null, 2));
          return data[index];
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
}

export default FileHandler;
