// Import required modules
const express = require('express');
const dotenv = require('dotenv');
const dbConfig = require('../config/dbConfig'); // Corrected path to dbConfig
const routes = require('./routes/index'); // Corrected path to routes
const product = require('./routes/products'); // New import for product routes
const productStyles = require('./routes/productStyles');
const cors = require('cors');
const morgan = require('morgan');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Allow requests from all origins
app.use(cors());

// Log HTTP requests to the console
app.use(morgan('dev'));

// Middleware to parse JSON bodies
app.use(express.json());

// Use routes
app.use('/api', routes);
app.use('/api/products', productStyles);
// app.use('/api/products', productRoutes); // Mount product routes under /api/products

// Define port
// const PORT = process.env.PORT || 3000;
const PORT = 3001;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
