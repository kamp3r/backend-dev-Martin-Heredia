import { Router } from 'express';
import { productDao } from '../daos/indexDaos.js';

const ProductRoute = Router();

const isAdmin = true;

ProductRoute.get('/:id?', async (req, res) => {
  const id = req.params.id;
  if (id) {
    const product = await productDao.getById(id);
    res.json(product);
  } else {
    const products = await productDao.readAll();
    if(products.length > 0){
    res.json(products);
    }else{
      res.json({message: "No products found"});
    }
  }
});

ProductRoute.post('/', async (req, res) => {
  const product = req.body;
  if (isAdmin === true) {
    if (
      product.title &&
      parseInt(product.price) &&
      product.thumbnail &&
      product.description &&
      product.code &&
      parseInt(product.stock)
    ) {
      productDao.save(product);
      res.json(product);
    } else {
      res.status(400).json({ error: "Faltan datos" });
    }
  } else {
    res.status(404).json({error: -1, descripcion: `Ruta ${req.originalUrl}, metodo ${req.method} NO AUTORIZADO`});
  }
});

ProductRoute.put('/:id', async (req, res) => {
  const id = req.params.id;
  if ((await productDao.updateElement(id, req.body)) == null) {
    return res.status(404).json({ message: 'Product not found' });
  } else {
    return res.json(await productDao.updateElement(id, req.body));
  }
});

ProductRoute.delete('/:id', async (req, res) => {
  const id = req.params.id;
  if ((await productDao.deleteElement(id)) == null) {
    return res.status(404).json({ message: 'Product not found' });
  } else {
    return res.json({ message: 'Product deleted' });
  }
});

export default ProductRoute;
