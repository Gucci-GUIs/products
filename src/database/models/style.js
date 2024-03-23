// database/models/style.js
const mongoose = require('mongoose');

const styleSchema = new mongoose.Schema({
    id: { type: Number, index: true },
    productId: { type: Number, index: true }, // Index removed ref: 'Product'
    name: String,
    original_price: Number,
    sale_price: Number,
    default_style: Boolean,
    skus: {
        size: [String],
        quantity: [Number]
    }
});

const Style = mongoose.model('Style', styleSchema);

module.exports = Style;
