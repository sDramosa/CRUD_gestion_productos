const User = require('../models/User'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar usuario
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Verificar si ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'El usuario ya existe' });

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Iniciar sesión
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Contraseña incorrecta' });

    // Generar Token JWT
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ message: 'Login exitoso', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};