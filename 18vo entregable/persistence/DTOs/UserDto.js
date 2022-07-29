module.exports = class UserDTO{
    #id;
    #name;
    #lastName;
    #address;
    #phone;
    #email;
    #password;
    #profilePicture;
    #timestamp;

    constructor(id, name, lastName, address, phone, email, password, profilePicture, timestamp){
        this.#id = id;
        this.#name = name;
        this.#lastName = lastName;
        this.#address = address;
        this.#phone = phone;
        this.#email = email;
        this.#password = password;
        this.#profilePicture = profilePicture;
        this.#timestamp = timestamp;
    }

    getId(){
        return this.#id;
    }
    getName(){
        return this.#name;
    }
    getLastName(){
        return this.#lastName;
    }
    getAddress(){
        return this.#address;
    }
    getPhone(){
        return this.#phone;
    }
    getEmail(){
        return this.#email;
    }
    getPassword(){
        return this.#password;
    }
    getProfilePicture(){
        return this.#profilePicture;
    }
    getTimestamp(){
        return this.#timestamp;
    }

    toJson(){
        return {
            id: this.#id,
            name: this.#name,
            lastName: this.#lastName,
            address: this.#address,
            phone: this.#phone,
            email: this.#email,
            password: this.#password,
            profilePicture: this.#profilePicture,
            timestamp: this.#timestamp
        }
    }
}