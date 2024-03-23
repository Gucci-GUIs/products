// routes/productsStyle.js

const express = require('express');
const router = express.Router();
const styleController = require('../controllers/styleController');

router.get('/:productId/styles', styleController.getStylesByProductId);

module.exports = router;
