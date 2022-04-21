import { Router } from 'express';
import CartHandler from '../API/CartHandler.js';
import ProductHandler from '../API/ProductHandler.js';

const cartRouter = Router();
const productsInStorage = new ProductHandler('db/products.json');
const cartFile = new CartHandler('db/cart.json');



// Desc     create cart
// route    POST /api/carrito/
// access   Private

cartRouter.post('/', async (req, res) => {
  const cart = await cartFile.createCart();
  res.json({ cart });
});

// Desc     delete cart by id
// route    DELETE /api/carrito/:id
// access   Private

cartRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    cartFile.deleteCartById(id)
        .then(() => res.json({ message: 'Cart deleted' }))
        .catch(err => res.status(500).json({ error: err }));
});

// Desc     get cart by id.
// route    GET /api/carrito/:id/productos
// access   Private

cartRouter.get('/:id/productos', (req, res) => {
    const { id } = req.params;
    cartFile.getCartById(id)
        .then(cart => res.json(cart))
        .catch(err => res.status(500).json({ error: err }));
});

// Desc     add product to cart by id
// route    POST /api/carrito/:id/productos
// access   Private

cartRouter.post('/:id/productos', async (req, res) => {
  const prod ={
    id: req.body.id,
    title: req.body.title,
    price: req.body.price,
    thumbnail: req.body.thumbnail,
    quantity: req.body.quantity,
  }
  const id = req.params.id;

  productsInStorage.getById(req.body.id).then((product) => {
    if (!product) {
      res.send({ error: 'No se encontro el producto' });
    } else {
      cartFile.addByid(id, prod).then((cart) => {
        if (cart) {
          res.json('Producto agregado');
        } else {
          res.json({ error: 'No se pudo agregar el producto' });
        }
      });
    }
  });
});

// Desc     delete cart by idCart and idProduct
// route    DELETE /api/carrito/:idCart/productos/:idProduct
// access   Private

cartRouter.delete('/:id/productos/:idProduct', (req, res) => {
    const idCart = req.params.id;
    const idProduct = req.params.idProduct;
    const cart = cartFile.deleteProductById(idCart, idProduct)
    if(cart == undefined){
        res.json({ error: 'No se pudo eliminar el producto' });
    }
    res.json({ message: 'Producto eliminado' });
});

export default cartRouter;
