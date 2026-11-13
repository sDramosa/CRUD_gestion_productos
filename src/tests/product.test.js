const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Pruebas de la API de Productos', () => {
  it('Debería rechazar el acceso a productos sin token JWT', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toEqual(401);
  });
});