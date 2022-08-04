const axios = require('axios');

//una vez hecho el post, tomar el id y hacer el get para obtener el producto y para hacer patch y delete

axios
  .get('http://localhost:8080/api/products')
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });

// axios
//   .post('http://localhost:8080/api/products', {
//     title: 'Product 1',
//     price: 100,
//     description:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
//     code: 'PRD-1',
//     stock: 10,
//   })
//   .then((res) => {
//     console.log(res.data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// axios
//   .patch(
//     'http://localhost:8080/api/products/edit/10f8741c-54c1-4b5d-8d01-b73894ea15fb',
//     {
//       title: 'Product 2',
//       price: 200,
//       description: 'No mas lorem ipsum',
//     }
//   )
//   .then((res) => {
//     console.log(res.data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// axios
//   .delete(
//     'http://localhost:8080/api/products/10f8741c-54c1-4b5d-8d01-b73894ea15fb'
//   )
//   .then((res) => {
//     console.log(res.data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
