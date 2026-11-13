const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const verifyToken = require('../middlewares/authMiddleware');

// Protegemos todas las rutas con el middleware verifyToken
router.post('/', verifyToken, productController.createProduct);
router.get('/', verifyToken, productController.getProducts);
router.put('/:id', verifyToken, productController.updateProduct);
router.delete('/:id', verifyToken, productController.deleteProduct);

module.exports = router;