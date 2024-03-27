// database/models/products.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: Number,
  campus: String,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  created_at: Date,
  updated_at: Date,
  related: [], // if we have String instead, mongo would return an array of strings for the related ids
  features: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feature' }] // Reference to Feature schema
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;


// // Import required modules
// const mongoose = require('mongoose');

// // Define the schema for the Product model
// const productSchema = new mongoose.Schema({
//   id: Number,
//   campus: String,
//   name: String,
//   slogan: String,
//   description: String,
//   category: String,
//   default_price: String,
//   created_at: Date,
//   updated_at: Date,
//   features: [{
//     feature: String,
//     value: String
//   }]
// });

// // Create the Product model based on the schema
// const Product = mongoose.model('Product', productSchema);

// // Export the Product model
// module.exports = Product;
