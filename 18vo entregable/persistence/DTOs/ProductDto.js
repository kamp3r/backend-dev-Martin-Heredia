module.exports = class ProductDTO{
    #id
    #title
    #price
    #description
    #thumbnail
    #code
    #stock
    #timestamp

    constructor(id, title, price, description, thumbnail, code, stock, timestamp){
        this.#id = id;
        this.#title = title;
        this.#price = price;
        this.#description = description;
        this.#thumbnail = thumbnail;
        this.#code = code;
        this.#stock = stock;
        this.#timestamp = timestamp;
    }

    getId(){
        return this.#id;
    }
    getTitle(){
        return this.#title;
    }
    getPrice(){
        return this.#price;
    }
    getDescription(){
        return this.#description;
    }
    getThumbnail(){
        return this.#thumbnail;
    }
    getCode(){
        return this.#code;
    }
    getStock(){
        return this.#stock;
    }
    getTimestamp(){
        return this.#timestamp;
    }

    toJson(){
        return {
            id: this.#id,
            title: this.#title,
            price: this.#price,
            description: this.#description,
            thumbnail: this.#thumbnail,
            code: this.#code,
            stock: this.#stock,
            timestamp: this.#timestamp
        }
    }
}