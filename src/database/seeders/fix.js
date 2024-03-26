const mongoose = require('mongoose');
const Style = require('./models/styles'); // Import the Style model

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/products';
mongoose.connect(MONGODB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Function to update documents in batches
const updateDocumentsInBatches = async () => {
  try {
    const batchSize = 100000;
    let updatedCount = 0;

    // Update documents in batches
    while (true) {
      const result = await Style.updateMany(
        { size: ['One', 'Size'] },
        { $set: { 'size': ['One Size'] } },
        { multi: true }
      );

      if (result.nModified === 0) {
        break; // Exit loop if no more documents to update
      }

      updatedCount += result.nModified;

      // Log progress every 100,000 documents
      if (updatedCount % batchSize === 0) {
        console.log(`${updatedCount} documents updated.`);
      }
    }

    console.log('All documents updated successfully!');
  } catch (error) {
    console.error('Error updating documents:', error);
  } finally {
    // Close MongoDB connection
    mongoose.disconnect();
  }
};

// Call the main function to update documents
updateDocumentsInBatches();
