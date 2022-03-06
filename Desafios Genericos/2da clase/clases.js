class Persona{
    constructor({name: name, apellido: apellido, edad: edad}){
        this.name = name;
        this.apellido = apellido;
        this.edad = edad
    }
}

const p = new Persona({apellido: "Josue", edad: 5, name: "Pepe"})
console.log(p)