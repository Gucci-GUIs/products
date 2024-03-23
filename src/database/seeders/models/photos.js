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

// Function to update styles with photos
const updateStylesWithPhotos = async (filePath) => {
  try {
    const batchSize = 10000; // Set the batch size
    let count = 0;

    // Create a readable stream to parse CSV file
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', async (photo) => {
        const styleId = parseInt(photo.styleId); // Ensure styleId is parsed as integer
        const style = await Style.findOne({ id: styleId });

        if (style) {
          style.photos.push({ url: photo.url, thumbnail_url: photo.thumbnail_url });
          await style.save();
        } else {
          console.error(`Style with id ${styleId} not found.`);
        }

        // Increment count
        count++;

        // Check if batch size reached, if so, log progress
        if (count % batchSize === 0) {
          console.log(`Processed ${count} photos.`);
        }
      })
      .on('end', () => {
        console.log('All photos updated successfully!');
        // Close MongoDB connection
        mongoose.disconnect();
      })
      .on('error', (error) => {
        console.error('Error processing photos:', error);
      });
  } catch (error) {
    console.error('Error updating styles with photos:', error);
  }
};

// Call function to update styles with photos
updateStylesWithPhotos('./data/photos-clean.csv');
