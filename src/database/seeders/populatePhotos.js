const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/products';
mongoose.connect(MONGODB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const photoSchema = new mongoose.Schema({
    styleId: {
        type: Number,
        ref: 'Style',
        index: true
    },
    urls: [String],
    thumbnail_urls: [String]
});

const Photo = mongoose.model('Photo', photoSchema);

const updateStylesWithPhotos = async (filePath, db) => {
    try {
        const stream = fs.createReadStream(filePath).pipe(csv());

        for await (const row of stream) {
            const { styleId, url, thumbnail_url } = row;
            let photo = await Photo.findOne({ styleId });

            if (!photo) {
                photo = new Photo({
                    styleId,
                    urls: [url],
                    thumbnail_urls: [thumbnail_url]
                });
            } else {
                photo.urls.push(url);
                photo.thumbnail_urls.push(thumbnail_url);
            }

            await photo.save();
        }

        console.log('Documents inserted successfully');
    } catch (error) {
        console.error('Error updating styles with photos:', error);
    } finally {
        mongoose.disconnect();
    }
};

updateStylesWithPhotos('./data/photos-clean.csv', db);
