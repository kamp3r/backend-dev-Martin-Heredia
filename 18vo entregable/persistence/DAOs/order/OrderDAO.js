const { Order } = require('../../../models/order');

const InterfaceOrder = require('./InterfaceOrder');
const OrderDTO = require('../../DTOs/OrderDto');

class OrderMongoDAO extends InterfaceOrder {
  constructor(Cart, Order, DTO) {
    super();
    this.Cart = Cart;
    this.Order = Order;
    this.DTO = DTO;
    require('../../connection/connectionMongo.js')
  }
  async create(userId) {
    const cartProducts = await this.Cart.find({ userId: userId })
      .lean()
      .populate({
        path: 'product',
        select: '_id title description code thumbnail price',
      })
      .exec();
    if (!cartProducts.length) {
      throw new Error('No hay productos en el carrito');
    }
    const productWithQuantity = cartProducts.map((cartProduct) => {
      return {
        ...cartProduct.product,
        quantity: cartProduct.quantity,
      };
    });
    const { _id, user, products, number, status, timestamp } =
      await this.Order.create({
        userId: userId,
        products: productWithQuantity,
        number: await this.OrderModel.countDocuments(),
      });

    await this.Cart.deleteMany({ userId: userId });
    return new this.DTO(
      _id,
      user,
      products,
      number,
      status,
      timestamp
    ).toJSON();
  }
}

module.exports = OrderMongoDAO(Cart, Order, OrderDTO);
