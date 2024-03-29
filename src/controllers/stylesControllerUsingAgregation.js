// controllers/styleController.js TEST!
const Style = require('../database/models/style');

const getStylesByProductId = async (req, res) => {
  const productId = parseInt(req.params.productId, 10); // Parse productId to integer
  try {
    const styleData = await Style.aggregate([
      { $match: { productId } },
      {
        $lookup: {
          from: 'photos',
          localField: 'id',
          foreignField: 'styleId',
          as: 'photos'
        }
      },
      {
        $project: {
          _id: 0,
          style_id: '$id',
          name: 1,
          original_price: 1,
          sale_price: 1,
          default: '$default_style',
          photos: {
            urls: '$photos.urls',
            thumbnail_urls: '$photos.thumbnail_urls'
          },
          skus: 1
        }
      }
    ]);

    res.json({ product_id: productId, results: styleData });
  } catch (error) {
    console.error('Error fetching product styles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getStylesByProductId };
