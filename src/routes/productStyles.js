// routes/productsStyle.js

const express = require('express');
const router = express.Router();
const styleController = require('../controllers/styleController');
const styleControllerAgregation = require('../controllers/stylesControllerUsingAgregation');

router.get('/:productId/styles', styleController.getStylesByProductId);
router.get('/:productId/stylesAgregationTest', styleControllerAgregation.getStylesByProductId);

module.exports = router;
