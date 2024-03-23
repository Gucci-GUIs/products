// Import required modules
const mongoose = require('mongoose');

// Define the schema for the features collection
const featureSchema = new mongoose.Schema({
  product_id: Number,
  feature: String,
  value: String,
});

// Create the Feature model using the schema
const Feature = mongoose.model('Feature', featureSchema);

// Export the Feature model
module.exports = Feature;
