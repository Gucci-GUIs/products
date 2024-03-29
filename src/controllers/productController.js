// controllers/productController.js

const Product = require('../database/models/products');
const Feature = require('../database/models/features');

const getProductById = async (req, res) => {
  const productId = req.params.id;
  const isRelatedEndpoint = req.path.includes('related');

  try {
    // Query for the product using the id field
    const product = await Product.findOne({ id: productId }).select('-__v -_id');
    // const product = await Product.findOne({ id: productId }).populate('related').select('-__v -_id');

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (isRelatedEndpoint) {
      // Return only the related IDs
      return res.json(product.related || []);
    }

    // Query for features associated with the product id
    const features = await Feature.find({ product_id: productId }).select('-__v -_id -product_id');

    // Combine product details with features
    const productWithFeatures = { ...product.toObject(), features };

    // Return the product with features
    return res.json(productWithFeatures);
  } catch (error) {
    console.error('Error fetching product:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getProductById };



// // Import the Product model
// const Product = require('../database/models/products');

// // Controller function to get product by id
// const getProductById = async (req, res) => {
//   const productId = req.params.id;

//   try {
//     // Query for the product using the id field
//     const product = await Product.findOne({ id: productId });

//     // Check if product exists
//     if (!product) {
//       return res.status(404).json({ error: 'Product not found' });
//     }

//     // If product exists, return it
//     res.json(product);
//   } catch (error) {
//     console.error('Error fetching product:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// module.exports = { getProductById };










// const Product = require('../database/models/products');

// // Controller function to get a product by ID
// const getProductById = async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ error: 'Product not found' });
//     }
//     return res.json(product);
//   } catch (error) {
//     console.error('Error fetching product:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };

// module.exports = {
//   getProductById,
// };
