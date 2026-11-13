const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./src/config/db');

dotenv.config();
connectDB();

const app = express();

//comentario pagina de inicio
// escribir un mensaje en el http para que no se quede en blanco la pantalla de inicio
app.get('/', (req, res) => {
  res.send('Ya prendió! Bienvenido a la API de gestión de productos!');
});

app.use(express.json());
app.use(cors());

// Servir la vista estática de login
app.use(express.static(path.join(__dirname, 'src/public')));

// Rutas de la API
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/products', require('./src/routes/productRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});

module.exports = app;