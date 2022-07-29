module.exports = class MessageDTO{
    #id;
    #author;
    #messageText;
    #date;

    constructor(id, author, messageText, date){
        this.#id = id;
        this.#author = author;
        this.#message = message;
        this.#date = date;
    }

    getId(){
        return this.#id;
    }
    getAuthor(){
        return this.#author;
    }
    getMessage(){
        return this.#messageText;
    }
    getTimestamp(){
        return this.#date;
    }

    toJson(){
        return {
            id: this.#id,
            author: this.#author,
            message: this.#messageText,
            date: this.#date
        };
    }
}

module.exports = MessageDTO;

