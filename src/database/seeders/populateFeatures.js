const fs = require('fs');
const csvParser = require('csv-parser');
const mongoose = require('mongoose');
const Feature = require('./models/features'); // Adjust the import to the features model
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/products';
mongoose.connect(MONGODB_URI);

// Function to read and parse CSV file for features
const readFeaturesCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const features = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        features.push(row);
      })
      .on('end', () => {
        resolve(features);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

// Main function to populate features
const populateFeatures = async (start, batchSize) => {
  try {
    const featuresData = await readFeaturesCSV('./data/features-clean.csv'); // Adjust the path to the features CSV file
    const totalFeatures = featuresData.length;
    let currentStart = start;
    let lastInsertedIndex = await getLastInsertedIndex();

    while (currentStart <= totalFeatures) {
      const nextStart = lastInsertedIndex + 1; // Start next batch from the next index
      const end = Math.min(nextStart + batchSize - 1, totalFeatures); // Calculate end index for the batch
      const featuresToInsert = featuresData.slice(currentStart - 1, end);
      await Feature.insertMany(featuresToInsert);
      console.log(`Features ${currentStart}-${end} saved successfully!`);
      currentStart = end + 1; // Move to the next batch
      lastInsertedIndex = end;
    }

    console.log('All features saved successfully!');
  } catch (error) {
    console.error('Error populating features:', error);
  } finally {
    // Close MongoDB connection
    mongoose.disconnect();
  }
};

// Function to get the last inserted product_id
const getLastInsertedIndex = async () => {
  const lastInsertedFeature = await Feature.findOne({}, 'product_id').sort({ product_id: -1 });
  return lastInsertedFeature ? lastInsertedFeature.product_id : 0;
};

// Call the main function to populate features
const start = 1; // Start from the first record
const batchSize = 100000; // Set the batch size as desired
populateFeatures(start, batchSize);
