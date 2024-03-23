// features.js Model
const mongoose = require('mongoose');

// Define Features schema
const featureSchema = new mongoose.Schema({
  product_id: { type: Number, ref: 'Product', index: true }, // Add index on product_id
  feature: String,
  value: String
});

// Create Features model
const Feature = mongoose.model('Feature', featureSchema);

module.exports = Feature;

// const mongoose = require('mongoose');

// // Define Features schema
// const featureSchema = new mongoose.Schema({
//   product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Reference to the Product model
//   feature: String,
//   value: String
// });

// // Create Features model
// const Feature = mongoose.model('Feature', featureSchema);

// module.exports = Feature;
