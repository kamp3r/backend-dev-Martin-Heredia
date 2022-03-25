const express = require('express')
const { Router } = express
const PORT = 8080 || process.env.PORT;

const app = express()
const router = Router()

const ApiRestful = require('./functions/apifunctions');
const object = new ApiRestful()

app.use('/api/productos', router)
app.use('/static', express.static(__dirname + '/public'))

router.use(express.urlencoded({ extended: true }))
router.use(express.json())


router.get('/', (req, res)=>{
    const products = object.getObjects();
    (products.length > 0) ? res.json(products) : res.status(404).json({error: 'No se encontraron los productos'})
})

router.get('/:id', (req, res)=>{
    const product = object.getObjectById(req.params.id);
    (product.length > 0) ? res.json(product) : res.status(404).json({error: 'No se encontró el producto'})
})

router.post('/', (req, res)=>{
    const product = req.body
    if(product.title && product.price && product.thumbnail){
        object.addObject(product)
        res.json(product)
    }else{
        res.status(400).json({error: 'Faltan datos'})
    }
})

router.put('/:id', (req, res)=>{
    const product = object.updateObjectById(req.params.id, req.body);
    (product != undefined) ? res.json(product) : res.status(404).json({error: 'No se encontró el producto a borrar'})
})

router.delete('/:id', (req, res)=>{
    const product = object.deleteObjectById(req.params.id);
    (product != undefined) ? res.json(product) : res.status(404).json({error: 'No se encontró el producto a borrar'})
})


app.listen(PORT, () => console.log(`Escuchando cambios en el puerto ${PORT}, con normalidad`))



