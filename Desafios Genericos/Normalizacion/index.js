import { normalize, schema } from "normalizr";
import util from 'util';
import { readFileSync } from "fs";

const empresa = JSON.parse(readFileSync('./empresa.json'));

//Se define el schema del empleado
const empleadoSchema = new schema.Entity('empleado');

//Se define el schema de organigrama

const organigrama = new schema.Entity('organigrama', {
    gerente: empleadoSchema,
    encargado: empleadoSchema,
    empleados: [ empleadoSchema ],
});

const print = (object)=>{
    console.log(util.inspect(object, false, 12, true));
}

console.log(' ---objeto normalizado--- ');
const normalizedEmpresa = normalize(empresa, organigrama);
print(normalizedEmpresa);

console.log('longitud de objeto original', JSON.stringify(empresa).length);
console.log('longitud de objeto normalizado', JSON.stringify(normalizedEmpresa).length);

   