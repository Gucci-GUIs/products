// database/models/photo.js

const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  styleId: Number,
  urls: String,
  thumbnail_urls: String
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;