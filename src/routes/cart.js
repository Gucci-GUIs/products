const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Route to get the cart
router.get('/cart', cartController.getCart);

// Route to add a product to the cart
router.post('/cart', cartController.addToCart);

module.exports = router;