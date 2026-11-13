const request = require('supertest');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Cargamos las variables de entorno para que Jest lea el .env
dotenv.config();

const app = require('../../server'); // Importamos la aplicación Express para hacer las pruebas

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI);
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Pruebas de la API de Productos', () => {
  it('Debería rechazar el acceso a productos sin token JWT', async () => {
    const res = await request(app).get('/api/products');
    // Esperamos un código 401 (Unauthorized) porque no enviamos el token
    expect(res.statusCode).toEqual(401);
  });
});