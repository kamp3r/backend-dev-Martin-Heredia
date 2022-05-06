import mongoose from "mongoose";

const estudiantesColl = 'estudiantes';

const EstudianteSchema = new mongoose.Schema({
    nombre: {type: String, required: true, max: 120},
    apellido: {type: String, required: true, max: 120},
    edad: {type: Number, required: true, max: 99},
    dni: {type: String, required: true, max: 8, unique: true},
    curso: {type: String, required: true, max: 10},
    nota: {type: Number, required: true, max: 20}
})
export const estudiantes = mongoose.model(estudiantesColl, EstudianteSchema)