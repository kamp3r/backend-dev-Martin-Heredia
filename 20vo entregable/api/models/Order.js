/**
 * Order.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    products: { type: 'json', required: true },
    email: { type: 'string', required: true },
    amount: { type: 'number', required: true },
    status: { type: 'string', enum: ['pending', 'paid'], defaultsTo: 'pending' },
    userId: { type: 'string', required: true },
  },

};

