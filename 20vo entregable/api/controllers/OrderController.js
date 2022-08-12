/**
 * OrderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getById: async (req, res) => {
    try {
      const orders = await Order.findOne({ id: req.params._id });
      if (!orders) {
        return res.status(404).send({
          message: 'No orders found',
        });
      }
      return res
        .status(200)
        .send({ success: true, message: 'Orders found', data: orders });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  create: async (req, res) => {
    try {
      const order = await Order.create(req.body);
      return res.status(200).send({
        success: true,
        message: 'Order created',
        data: order,
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  }

};

