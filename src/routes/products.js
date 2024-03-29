// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const productsController = require('../controllers/productsController');

// Route to get a specific product by ID
router.get('/:id', productController.getProductById);

// Route to retrieve the list of products with pagination
router.get('/', productsController.getProducts);

// Route to get related products by product ID
router.get('/:id/related', productController.getProductById);

module.exports = router;