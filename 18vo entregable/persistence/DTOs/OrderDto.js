module.exports = class OrderDTO {
  #id;
  #user;
  #products;
  #total;
  #status;
  #timestamp;

  constructor(id, user, products, total, status, timestamp) {
    this.#id = id;
    this.#user = user;
    this.#products = products;
    this.#total = total;
    this.#status = status;
    this.#timestamp = timestamp;
  }

  getId() {
    return this.#id;
  }
  getUser() {
    return this.#user;
  }
  getProducts() {
    return this.#products;
  }
  getTotal() {
    return this.#total;
  }
  getStatus() {
    return this.#status;
  }
  getTimestamp() {
    return this.#timestamp;
  }

  toJson() {
    return {
      id: this.#id,
      user: this.#user,
      products: this.#products,
      total: this.#total,
      status: this.#status,
      timestamp: this.#timestamp
    };
  }
}

