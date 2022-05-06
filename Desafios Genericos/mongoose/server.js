import mongoose from "mongoose";
import * as model from "./models/estudiantes.js"

const crud = async ()=>{
    try{
        const url = 'mongodb://localhost:27017/colegio'
        let rta = await mongoose.connect(url)
        console.log('Base de datos conectada')

        /*Create*/
    
        // console.log('Create')
        // const alumnos = [
        //     { nombre: 'Pedro', apellido: 'Mei', edad: 21, dni: '31155898', curso: '1A', nota: 7 },
        //     { nombre: 'Ana', apellido: 'Gonzalez', edad: 32, dni: '27651878', curso: '1A', nota: 8 },
        //     { nombre: 'José', apellido: 'Picos', edad: 29, dni: '34554398', curso: '2A', nota: 6 },
        //     { nombre: 'Lucas', apellido: 'Blanco', edad: 22, dni: '30355874', curso: '3A', nota: 10 },
        //     { nombre: 'María', apellido: 'García', edad: 36, dni: '29575148', curso: '1A', nota: 9 },
        //     { nombre: 'Federico', apellido: 'Perez', edad: 41, dni: '320118321', curso: '2A', nota: 5 },
        //     { nombre: 'Tomas', apellido: 'Sierra', edad: 19, dni: '38654790', curso: '2B', nota: 4 },
        //     { nombre: 'Carlos', apellido: 'Fernández', edad: 33, dni: '26935670', curso: '3B', nota: 2 },
        //     { nombre: 'Fabio', apellido: 'Pieres', edad: 39, dni: '4315388', curso: '1B', nota: 9 },
        //     { nombre: 'Daniel', apellido: 'Gallo', edad: 25, dni: '37923460', curso: '3B', nota: 2 }
        // ]
        // alumnos.map (alumno => {
        //     model.estudiantes.insertMany([alumno])
        //     .then(rta => { console.log(rta) })
        //     .catch(err => { console.log(err) })
        // }
        // )

        /*orden alfabetico*/

        // model.estudiantes.find({}).sort({nombre: 1})
        // .then(rta => { console.log(rta) })
        // .catch(err => { console.log(err) })

        // model.estudiantes.find({}).sort({edad: 1}).limit(1)
        // .then(rta => { console.log(`el estudiante mas joven es ${rta}`) })
        // .catch(err => { console.log(err) })

        // model.estudiantes.find({curso: '2A'})
        // .then(rta => { console.log(rta) })
        // .catch(err => { console.log(err) })

        // model.estudiantes.find({}).sort({edad: 1}).skip(1).limit(1)
        // .then(rta => { console.log(`El segundo estudiante mas joven es ${rta}`) })
        // .catch(err => { console.log(err) })

        // model.estudiantes.find({}, {nombre: 1, apellido: 1, curso: 1}).sort({apellido: -1})
        // .then(rta => { console.log(rta) })
        // .catch(err => { console.log(err) })

        // model.estudiantes.find({nota: {$eq: 10}})
        // .then(rta => { console.log(rta) })
        // .catch(err => { console.log(err) })

        // model.estudiantes.find({})
        // .then(rta =>{
        //     let nota = 0
        //     rta.forEach(alumno => {
        //         nota += alumno.nota
        // })
        // console.log(`La nota media es ${nota/rta.length}`)
        // })
        
        // model.estudiantes.find({curso: '1A'})
        // .then(rta => {
        //     let nota = 0
        //     rta.forEach(alumno => {
        //         nota += alumno.nota
        // })
        // console.log(`La nota media del curso 1A es ${nota/rta.length}`)
        // })

        // console.log('Modificar el dni de lucas blanco')

        // let updni = await model.estudiantes.updateOne({
        //     nombre: 'Lucas',
        //     apellido: 'Blanco'
        // }, {dni: 20355875})
        // console.log(updni)

        console.log('Agregar a todos el campo nuevo')

        let actualizacion = await model.estudiantes.updateMany({},{ingreso: false})
        console.log(actualizacion)

        // console.log('Modificar el valor de ingreso a true a todos los estudiantes del curso 1A')

        // let campo1a = await model.estudiantes.updateMany({curso: '1A'}, {$set: {"ingreso": true}}, {new: true, multi: true, upsert: true})
        // .then(rta => { console.log(rta) })
        // .catch(err => { console.log(err) })


    }catch{
        console.error('No se pudo conectar')
    }
}

crud()