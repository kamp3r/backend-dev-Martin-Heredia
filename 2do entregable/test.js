const Container = require('./function');

const test = new Container('productos.txt');

test.save({
  title: 'Escuadra',
  price: 123.45,
  thumbnail:
    'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
});
test.save({
  title: 'Calculadora',
  price: 234.56,
  thumbnail:
    'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
});
test.save({
  title: 'Globo Terráqueo',
  price: 345.67,
  thumbnail:
    'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
});

// test.getById(1)
// test.getById(2)
// test.getById(3)
// test.deleteById(1)
// test.deleteById(2)
// test.deleteById(3)
// test.deleteAll()