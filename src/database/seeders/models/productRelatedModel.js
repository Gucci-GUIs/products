const mongoose = require('mongoose');

// Define Products schema
const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true, // Ensure uniqueness of the id field
    index: true // Create an index on the id field
  },
  campus: String,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  features: [{
    feature: String,
    value: String
  }],
  related: [Number] // Define the 'related' field as an array of numbers
}, { timestamps: true });

// Create Products model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
