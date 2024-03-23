// controllers/productsController.js

const Product = require('../database/models/products');

// Controller function to retrieve the list of products with pagination
const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default page is 1
    const count = parseInt(req.query.count) || 5; // Default count is 5

    const skip = (page - 1) * count; // Calculate the number of documents to skip

    // Query products with pagination
    const products = await Product.find({}, { _id: 0, __v: 0, related: 0, features: 0  }).skip(skip).limit(count);

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getProducts };