import { Router } from 'express';
import { cartDao, productDao } from '../daos/indexDaos.js';

const CartRoute = Router();

CartRoute.get('/', async (req, res) => {
  res.json(await cartDao.readAll());
});

CartRoute.get('/:id/products', async (req, res) => {
  const id = req.params.id;
  const cart = await cartDao.getById(id);
  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ message: 'Cart not found' });
  }
});

CartRoute.post('/', async (req, res) => {
  const cart = {
    timestamp: new Date().toISOString(),
    products: [],
  };
  cartDao.save(cart);
  res.json(cart);
});

CartRoute.post('/:id/products', async (req, res) => {
  const id = req.params.id;

  let product = productDao.getById(req.body.id).then((product) => {
    if (!product) {
      res.send({ error: 'No se encontro el producto' });
    } else {
      cartDao.addByid(id, product).then((cart) => {
        if (cart) {
          res.json('Producto agregado');
        } else {
          res.json({ error: 'No se pudo agregar el producto' });
        }
      });
    }
  });
});

CartRoute.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const cart = await cartDao.deleteElement(id);
  if (cart) {
    res.json({ message: 'Cart deleted' });
  } else {
    res.status(404).json({ message: 'Cart not found' });
  }
});

CartRoute.delete('/:id/products/:id_prod', async (req, res) => {
  const idCart = req.params.id;
  const idProduct = req.params.id_prod;
  if(idCart && idProduct){
  cartDao.deleteByIdfromCart(idCart, idProduct)
  res.json({ message: 'Product deleted' });
  }else{
    res.status(404).json({ message: 'The params are not valid' });
  }
});

export default CartRoute;
