// routes/index.js
const express = require('express');
const router = express.Router();

// Import product routes
const productRoutes = require('./products');

// Define product routes
router.use('/products', productRoutes);

module.exports = router;
// const express = require('express');
// const router = express.Router();

// // Define routes here
// router.get('/', (req, res) => {
//   res.send('Hello, world!');
// });

// module.exports = router;