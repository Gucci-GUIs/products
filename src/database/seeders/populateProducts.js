const fs = require('fs');
const csvParser = require('csv-parser');
const mongoose = require('mongoose');
const Product = require('./models/products');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/products';
mongoose.connect(MONGODB_URI);

// Function to read and parse CSV file
const readCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const products = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        products.push(row);
      })
      .on('end', () => {
        resolve(products);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

// Function to save products to MongoDB in batches
const saveProductsToDB = async (products, start, batchSize) => {
  try {
    const startIdx = start - 1; // Adjust for 0-based indexing
    const endIdx = Math.min(startIdx + batchSize, products.length);
    const productsToInsert = products.slice(startIdx, endIdx);
    await Product.insertMany(productsToInsert);
    console.log(`Products ${start}-${endIdx} saved successfully!`);
    return endIdx; // Return the index where the batch ends
  } catch (error) {
    console.error('Error saving products:', error);
  }
};

// Main function to populate products
const populateProducts = async (start, batchSize) => {
  try {
    const productsData = await readCSV('./data/product-clean.csv');
    const totalProducts = productsData.length;
    let currentStart = start;
    while (currentStart <= totalProducts) {
      const nextStart = await saveProductsToDB(productsData, currentStart, batchSize);
      if (!nextStart) {
        break; // Exit loop if an error occurs in saveProductsToDB
      }
      currentStart = nextStart + 1; // Move to the next batch
    }
    console.log('All products saved successfully!');
  } catch (error) {
    console.error('Error populating products:', error);
  } finally {
    // Close MongoDB connection
    mongoose.disconnect();
  }
};

// Call the main function to populate products
const start = 0; // Start from the first record
const batchSize = 100000; // Set the batch size as desired
populateProducts(start, batchSize);
