class Usuario{
    constructor({nombre: nombre, apellido: apellido, libros: libros, mascotas: mascotas}){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }
    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }
    addMascota(mascota){
       this.mascotas.push(mascota)
    }
    countMascotas(){
        return this.mascotas.length
    }
    addBook(nombre, autor){
        this.libros.push({nombre,autor})
    }
    getBookNames(){
        return this.libros.map(libro=>libro.nombre)
    }
}

const Pepe = new Usuario({nombre: "Pepe", apellido: "Monje", libros: [], mascotas: []})

console.log(Pepe.getFullName())
Pepe.addMascota('Sunmi')
console.log(Pepe.countMascotas())
Pepe.addBook('Le Rouge et le Noir', 'Stendhal')
Pepe.addBook('1984', 'George Orwell')
console.log(Pepe.getBookNames())
console.log(Pepe)