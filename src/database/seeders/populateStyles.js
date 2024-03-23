const fs = require('fs');
const csvParser = require('csv-parser');
const mongoose = require('mongoose');
const Style = require('./models/styles'); // Import the Style model
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/products';
mongoose.connect(MONGODB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Function to read and parse CSV file
const readCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const data = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        data.push(row);
      })
      .on('end', () => {
        resolve(data);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

// Function to save styles to MongoDB in batches
const saveStylesToDB = async (styles, start, batchSize) => {
  try {
    const startIdx = start; // Adjust for 0-based indexing
    const endIdx = Math.min(startIdx + batchSize, styles.length);
    const stylesToInsert = styles.slice(startIdx, endIdx);
    await Style.insertMany(stylesToInsert);
    console.log(`Styles ${start}-${endIdx} saved successfully!`);
    return endIdx; // Return the index where the batch ends
  } catch (error) {
    console.error('Error saving styles:', error);
  }
};

// Function to populate styles
const populateStyles = async (start, batchSize) => {
  try {
    const stylesData = await readCSV('./data/styles-clean.csv');
    const totalStyles = stylesData.length;
    let currentStart = start;
    while (currentStart <= totalStyles) {
      const nextStart = await saveStylesToDB(stylesData, currentStart, batchSize);
      if (!nextStart) {
        break; // Exit loop if an error occurs in saveStylesToDB
      }
      currentStart = nextStart + 1; // Move to the next batch
    }
    console.log('All styles saved successfully!');
  } catch (error) {
    console.error('Error populating styles:', error);
  } finally {
    // Close MongoDB connection
    mongoose.disconnect();
  }
};

// Call the main function to populate styles
const start = 0; // Start from the first record
const batchSize = 100000; // Set the batch size as desired
populateStyles(start, batchSize);
