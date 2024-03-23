// controllers/styleController.js
// const Style = require('../database/models/style');

// const getStylesByProductId = async (req, res) => {
//   const productId = parseInt(req.params.productId, 10); // Parse productId to integer
//   try {
//     const styleData = await Style.aggregate([
//       { $match: { productId } },
//       {
//         $lookup: {
//           from: 'photos',
//           localField: 'id',
//           foreignField: 'styleId',
//           as: 'photos'
//         }
//       },
//       {
//         $project: {
//           _id: 0,
//           style_id: '$id',
//           name: 1,
//           original_price: 1,
//           sale_price: 1,
//           default: '$default_style',
//           photos: {
//             urls: '$photos.urls',
//             thumbnail_urls: '$photos.thumbnail_urls'
//           },
//           skus: 1
//         }
//       }
//     ]);

//     res.json({ product_id: productId, results: styleData });
//   } catch (error) {
//     console.error('Error fetching product styles:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// module.exports = { getStylesByProductId };




// controllers/styleController.js
const Style = require('../database/models/style');
const Photo = require('../database/models/photo');

const getStylesByProductId = async (req, res) => {
  const productId = req.params.productId;
  try {
    const styles = await Style.find({ productId }).lean(); // Add .lean() method
    const formattedStyles = await Promise.all(styles.map(async (style) => {
      const photos = await Photo.find({ styleId: style.id }).lean(); // Add .lean() method
      // Flatten the nested arrays for urls and thumbnail_urls
      const flattenedUrls = photos.flatMap(photo => photo.urls);
      const flattenedThumbnailUrls = photos.flatMap(photo => photo.thumbnail_urls);
      return {
        style_id: style.id,
        name: style.name,
        original_price: style.original_price,
        sale_price: style.sale_price,
        default: style.default_style,
        photos: { urls: flattenedUrls, thumbnail_urls: flattenedThumbnailUrls },
        skus: style.skus
      };
    }));
    res.json({ product_id: productId, results: formattedStyles });
  } catch (error) {
    console.error('Error fetching product styles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { getStylesByProductId };


// controllers/styleController.js
// const Style = require('../database/models/style');
// const Photo = require('../database/models/photo');

// const getStylesByProductId = async (req, res) => {
//   const productId = parseInt(req.params.productId); // Parse productId to integer
//   try {
//     const styles = await Style.aggregate([
//       { $match: { productId } }, // Match styles with the given productId
//       {
//         $lookup: {
//           from: 'photos', // Collection to join
//           localField: 'id', // Field from the 'style' collection
//           foreignField: 'styleId', // Field from the 'photos' collection
//           as: 'photos' // Output array field
//         }
//       },
//       {
//         $project: {
//           _id: 0, // Exclude '_id' field
//           style_id: '$id', // Rename 'id' field to 'style_id'
//           name: 1, // Include 'name' field
//           original_price: 1, // Include 'original_price' field
//           sale_price: 1, // Include 'sale_price' field
//           default: '$default_style', // Rename 'default_style' field to 'default'
//           photos: {
//             urls: '$photos.urls', // Include 'urls' field from 'photos'
//             thumbnail_urls: '$photos.thumbnail_urls' // Include 'thumbnail_urls' field from 'photos'
//           },
//           skus: 1 // Include 'skus' field
//         }
//       },
//       {
//         $addFields: {
//           'photos.urls': { $reduce: { // Flatten the 'urls' array
//             input: '$photos.urls',
//             initialValue: [],
//             in: { $concatArrays: ['$$value', '$$this'] }
//           }},
//           'photos.thumbnail_urls': { $reduce: { // Flatten the 'thumbnail_urls' array
//             input: '$photos.thumbnail_urls',
//             initialValue: [],
//             in: { $concatArrays: ['$$value', '$$this'] }
//           }}
//         }
//       }
//     ]);

//     res.json({ product_id: productId, results: styles });
//   } catch (error) {
//     console.error('Error fetching product styles:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };