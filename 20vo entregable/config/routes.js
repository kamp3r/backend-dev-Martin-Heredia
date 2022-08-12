/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

  'GET /api/users': 'UserController.get',
  'GET /api/users/:_id': 'UserController.getById',
  'POST /api/users': 'UserController.create',
  'PATCH /api/users/:_id': 'UserController.update',
  'DELETE /api/users/:_id': 'UserController.delete',

  'GET /api/products': 'ProductController.get',
  'GET /api/products/:_id': 'ProductController.getById',
  'POST /api/products': 'ProductController.create',
  'PATCH /api/products/:_id': 'ProductController.update',
  'DELETE /api/products/:_id': 'ProductController.delete',

  'GET /api/orders/:_id': 'OrderController.getById',
  'POST /api/orders': 'OrderController.create',
};
