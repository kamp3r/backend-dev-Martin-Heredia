const request = require('supertest')('http://localhost:8080');
const expect = require('chai').expect;

//debe asignarse un id existente para correr el test, el expuesto, se encuentra actualmente funcionando a los fines de prueba

describe('Comprobacion general de CRUD', () => {
  it('Deberia retornar todos los productos', async () => {
    const response = await request.get('/api/products');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });

  it('Deberia retornar un producto', async () => {
    const response = await request.get(
      '/api/products/9b63136c-a405-4016-90b5-63095c81c4d5'
    );
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  }).timeout(5000);

  it('Deberia crear un producto', async () => {
    const response = await request.post('/api/products').send({
      title: 'Te Chai',
      price: 9999,
      description: 'Buen tecito',
      code: 'TC1',
      stock: 10,
    });
    expect(response.status).to.equal(201);
    expect(response.body).to.be.an('object');
  }).timeout(5000);

  it('Deberia actualizar un producto', async () => {
    const response = await request
      .patch('/api/products/edit/9ab5430c-6965-414c-a85f-e09c8e59f0ac')
      .send({
        title: 'Te Chai Caliente',
        price: 10000,
        description: 'El mejor te',
        code: 'TC2',
        stock: 12,
      });
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  }).timeout(5000);

  it('Deberia eliminar un producto', async () => {
    const response = await request.delete(
      '/api/products/9ab5430c-6965-414c-a85f-e09c8e59f0ac'
    );
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  }).timeout(5000);
});
