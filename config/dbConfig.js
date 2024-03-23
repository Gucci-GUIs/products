// dbConfig.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// Load environment variables from .env file
dotenv.config();

// MongoDB connection URI
const MONGODB_URI = process.env.MONGODB_URI; // Replace with your MongoDB URI

// Function to establish the database connection
async function connectDB() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);

    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
}

// Export the connectDB function
module.exports = connectDB;

// Call the connectDB function to establish the database connection
connectDB();
