class UserDTO{
    #id
    #name
    #lastName
    #password
    #email
    #address
    #phone
    #role
    #picture
    #createdAt

    constructor(id, name, lastName, password, email, address, phone, role, picture, createdAt){
        this.#id = id
        this.#name = name
        this.#lastName = lastName
        this.#password = password
        this.#email = email
        this.#address = address
        this.#phone = phone
        this.#role = role
        this.#picture = picture
        this.#createdAt = createdAt
    }
    getId(){
        return this.#id
    }
    getName(){
        return this.#name
    }
    getLastName(){
        return this.#lastName
    }
    getPassword(){
        return this.#password
    }
    getEmail(){
        return this.#email
    }
    getAddress(){
        return this.#address
    }
    getPhone(){
        return this.#phone
    }
    getRole(){
        return this.#role
    }
    getPicture(){
        return this.#picture
    }
    getCreatedAt(){
        return this.#createdAt
    }

    toJSON(){
        return {
            _id: this.#id,
            name: this.#name,
            lastName: this.#lastName,
            password: this.#password,
            email: this.#email,
            address: this.#address,
            phone: this.#phone,
            role: this.#role,
            picture: this.#picture,
            createdAt: this.#createdAt,
        }
    }
}

module.exports = UserDTO;