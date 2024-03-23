// styleModel.js
const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    urls: String,
    thumbnail_urls: String
}, { _id: false }); // Exclude _id field

// const skuSchema = new mongoose.Schema({
//     size: String,
//     quantity: Number
// }, { _id: false }); // Exclude _id field

// Define schema for Styles collection
const styleSchema = new mongoose.Schema({
    id: { type: Number, index: true }, // Add styleId field
    productId: { type: Number, ref: 'Product', index: true }, // Reference to Product
    name: String,
    original_price: Number,
    sale_price: Number,
    default_style: Boolean,
    photos: [photoSchema], // Embedded array of photos
    skus: [skuSchema] // Embedded array of SKUs
});

// Create Styles model
const Style = mongoose.model('Style', styleSchema);

module.exports = Style;




// const mongoose = require('mongoose');

// const styleSchema = new mongoose.Schema({
//   productId: { type: Number, ref: 'Product', index: true },
//   style_id: Number,
//   name: String,
//   original_price: Number,
//   sale_price: Number,
//   default_style: Boolean,
//   photos: [
//     {
//       thumbnail_url: String,
//       url: String
//     }
//   ],
//   skus: {
//     type: Map,
//     of: {
//       quantity: Number,
//       size: String
//     }
//   }
// });

// // Create Styles model
// const Style = mongoose.model('Style', styleSchema);

// module.exports = Style;












// const mongoose = require('mongoose');

// // Define Styles schema
// const styleSchema = new mongoose.Schema({
//   productId: { type: Number, ref: 'Product', index: true },
//   name: String,
//   sale_price: Number,
//   original_price: Number,
//   default_style: Number
// });

// // Create Styles model
// const Style = mongoose.model('Style', styleSchema);

// module.exports = Style;








// const mongoose = require('mongoose');

// // Define Styles schema
// const styleSchema = new mongoose.Schema({
//   id: Number,
//   productId: Number,
//   name: String,
//   sale_price: { type: Number, default: null },
//   original_price: Number,
//   default_style: Number,
// });

// // Index on productId for faster querying
// styleSchema.index({ productId: 1 });

// // Create Styles model
// const Style = mongoose.model('Style', styleSchema);

// module.exports = Style;
