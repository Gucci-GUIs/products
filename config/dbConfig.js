const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// MongoDB connection URI
const MONGODB_URI = process.env.MONGODB_URI; // Replace with your MongoDB URI

// Function to establish the database connection with connection pooling
async function connectDB() {
  try {
    // Configure MongoDB connection options with connection pooling
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: 10, // Adjust the pool size as needed based on your server capacity
      // Other options...
    };

    // Connect to MongoDB using Mongoose with the configured options
    await mongoose.connect(MONGODB_URI, options);

    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
}

// Export the connectDB function
module.exports = connectDB;

// Call the connectDB function to establish the database connection
connectDB();
