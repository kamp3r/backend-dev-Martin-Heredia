/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  get: async (req, res) => {
    try {
      const products = await Product.find();
      if (!products) {
        return res.status(404).send({
          message: 'No products found',
        });
      }
      return res
        .status(200)
        .send({ success: true, message: 'Products found', data: products });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  getById: async (req, res) => {
    try {
      const product = await Product.findOne({ id: req.params._id });
      if (!product) {
        return res.status(404).send({
          message: 'No product found',
        });
      }
      return res
        .status(200)
        .send({ success: true, message: 'Product found', data: product });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  create: async (req, res) => {
    try {
      req
        .file('thumbnail')
        .upload(
          { dirname: '../../assets/images/products' },
          async (err, uploadedFiles) => {
            if (err) {
              return res.status(500).json(err);
            }
            if (uploadedFiles.length === 0) {
              return res.badRequest('No file was uploaded');
            }
            sails.log.info(uploadedFiles[0]);
            const product = await Product.create({
              ...req.body,
              thumbnail: 'uploaded' + uploadedFiles[0].filename,
            });
            return res.status(200).send({
              success: true,
              message: 'Product created',
              data: product,
            });
          }
        );
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  update: async (req, res) => {
    try {
      if (!req.body.thumbnail) {
        const product = await Product.updateOne({ id: req.params._id }, req.body);
        return res
          .status(200)
          .send({ success: true, message: 'Product updated', data: product });
      }else{
        req
          .file('thumbnail')
          .upload(
            { dirname: '../../assets/images/products' },
            async (err, uploadedFiles) => {
              if (err) {
                return res.status(500).json(err);
              }
              if (uploadedFiles.length === 0) {
                return res.badRequest('No file was uploaded');
              }
              sails.log.info(uploadedFiles[0]);
              const product = await Product.updateOne({ id: req.params._id }, {
                ...req.body,
                thumbnail: 'uploaded' + uploadedFiles[0].filename,
              });
              return res.status(200).send({
                success: true,
                message: 'Product updated',
                data: product,
              });
            }
          );
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  delete: async (req, res) => {
    try {
      const product = await Product.destroy({ id: req.params._id });
      return res
        .status(200)
        .send({ success: true, message: 'Product deleted', data: product });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
};

