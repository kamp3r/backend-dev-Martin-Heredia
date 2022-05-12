class MemoryHandler {
  constructor() {
    this.container = [];
    this.counter = 0;
  }
  async readAll() {
    try {
      const data = await this.container;
      return data;
    } catch (err) {
      console.error(err);
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
      let data = await this.readAll();
      const productSave = { ...obj, id: this.counter++ + 1, timestamp: new Date().toISOString() };
      console.log(obj)
      data.push(productSave);
    try{
      return productSave;
    } catch (err) {
      console.error(err);
    }
  }
  async updateElement(id, element) {
    try {
      const updateProd = { ...element, id: Number(id) };
      const index = this.container.findIndex((prod) => prod.id == id);
      if (index >= 0) {
        this.container[index] = updateProd;
        return updateProd;
      }
    } catch (err) {
      console.error(err);
    }
  }
  async deleteElement(id) {
    try {
      const index = this.container.findIndex((prod) => prod.id == id);
      if (index >= 0) {
        const deleted = this.container.splice(index, 1);
        return deleted;
      }
    } catch (err) {
      console.error(err);
    }
  }
  async deleteAll() {
    try {
      const data = [];
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
        return data[index];
      } catch (err) {
        console.error(err);
      }
    }
  }
  async deleteByIdfromCart(idCart, idProduct) {
    try {
      let data = await this.readAll();
      let index = data.findIndex((cart) => cart.id == idCart);
      if (index != -1) {
        let indexProduct = data[index].products.findIndex(
          (product) => product.id == idProduct
        );
        if (indexProduct != -1) {
          data[index].products.splice(indexProduct, 1);
          return data[index];
        }
      }else{
        return null
      }
    } catch (err) {
      console.error(err);
    }
  }
}

export default MemoryHandler;
