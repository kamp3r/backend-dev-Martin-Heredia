const express = require('express')
const app = express();
const PORT = 8080 || process.env.PORT;

const ClassContainer = require('./functions/function');
const products = new ClassContainer('./products/productos.txt')


app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res)=>{
    res.send(`<h1>Bienvenidos al server de express, las rutas para acceder a esta prueba son /products y /productRandom</h1>`)
})

app.get('/products', (req, res)=>{
    products.getAll()
    .then(resp => res.send(resp))
    .catch(err => res.send(`<h1> Error fatal </h1>`))
})

app.get('/productRandom', (req,res)=>{
  const IdRandom = (min, max) =>{
    return Math.floor(Math.random() * (max - min + 1) + min)
  };
  const id = IdRandom(1,3)
  products.getById(id)
    .then(resp=> res.send(resp))
    .catch(err => res.send(`<h1> Error fatal </h1>`))
})

app.listen(PORT, () => {
    console.log(`Escuchando cambios en http://localhost:${PORT}`);
});