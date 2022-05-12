import path from 'node:path'
import 'dotenv/config'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const configDB = {
    fileSystem: {
        products: path.resolve(__dirname, '../data/filePers/products.json'),
        cart: path.resolve(__dirname, '../data/filePers/cart.json'),
    },
    firebase:{
        privateKey: path.resolve(__dirname, '../data/fbdat/herediamartinbackend-firebase-adminsdk-86cnz-44c76facd5.json'),
    }
    ,
    mongodb: {
        url: "mongodb+srv://kamp3rh:coderhouse@backendheredia.pimvu.mongodb.net/ecommerce"
    },
    memory: {
        products: [],
        cart: [],
    },
    DBSwitch: {
        DB: (process.env.db) ,
    }
};

console.log(`Inicializado el modulo ${configDB.DBSwitch.DB} para la base de datos`);


export default configDB;