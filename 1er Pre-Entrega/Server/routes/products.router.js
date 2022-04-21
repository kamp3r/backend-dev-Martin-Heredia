import { Router } from "express";
import ProductHandler from "../API/ProductHandler.js";
const productsRouter = Router();

const storageProducts = new ProductHandler("db/products.json");
const isAdmin = true;
// Desc     get product by id.
// route    GET /api/productos/:id
// access   Private

productsRouter.get("/:id?", async (req, res) => {
  const id = req.params.id;
  if ((await storageProducts.getById(id)) == undefined) {
    return res.json(await storageProducts.getAllProducts());
  } else {
    storageProducts
      .getById(id)
      .then((product) => res.send(product))
      .then(res.status(200))
      .catch((err) => res.status(400).send(err));
  }
});

// Desc     create product
// route    POST /api/productos
// access   Private

productsRouter.post("/", (req, res) => {
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
      storageProducts.save(product);
      res.json(product);
    } else {
      res.status(400).json({ error: "Faltan datos" });
    }
  } else {
    res.status(404).json({error: -1, descripcion: `Ruta ${req.originalUrl}, metodo ${req.method} NO AUTORIZADO`});
  }
});

// Desc     update product
// route    PUT /api/productos/:id
// access   Private

productsRouter.put("/:id", async (req, res) => {
  if (isAdmin === true) {
    if (
      (await storageProducts.updateProductById(req.params.id, req.body)) == null
    ) {
      return res.json({ error: "No se encontro el producto" });
    } else {
      return res.json(
        await storageProducts.updateProductById(req.params.id, req.body)
      );
    }
  } else {
    res.status(404).json({error: -1, descripcion: `Ruta ${req.originalUrl}, metodo ${req.method} NO AUTORIZADO`});
  }
});

// Desc     delete product
// route    DELETE /api/productos/:id
// access   Private

productsRouter.delete("/:id", async (req, res) => {
  if (isAdmin === true) {
    if ((await storageProducts.deleteProductById(req.params.id)) == null) {
      return res.json({ error: "No se encontro el producto" });
    } else {
      await storageProducts.deleteProductById(req.params.id);
      return res.json({
        message: "Producto con id " + req.params.id + " eliminado",
      });
    }
  } else {
    res.status(404).json({error: -1, descripcion: `Ruta ${req.originalUrl}, metodo ${req.method} NO AUTORIZADO`});
  }
});

export default productsRouter;
