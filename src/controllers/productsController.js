// controllers/productsController.js

const Product = require('../database/models/products');

// Controller function to retrieve the list of products with pagination
const NodeCache = require('node-cache');
const cache = new NodeCache();

const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const count = parseInt(req.query.count) || 5;
    const cacheKey = `products_page_${page}_count_${count}`;

    // Check if the data exists in the cache
    const cachedProducts = cache.get(cacheKey);
    if (cachedProducts) {
      return res.json(cachedProducts);
    }

    const skip = (page - 1) * count;

    const products = await Product.find({}, { _id: 0, __v: 0, related: 0, features: 0 }).skip(skip).limit(count);

    // Cache the products data
    cache.set(cacheKey, products);

    return res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getProducts };
