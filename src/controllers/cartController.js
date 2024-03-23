// cartController.js

// Controller function to retrieve the cart
const getCart = async (req, res) => {
  try {
    // in progress...Example response
    const cart = [
      { sku_id: 1, count: 2 },
      { sku_id: 3, count: 1 },
      { sku_id: 5, count: 33 },
    ];

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// in progress...
const addToCart = async (req, res) => {
  try {
    const { sku_id } = req.body;

    // in progress...
    const addedProduct = { sku_id, count: 1 };

    res.status(201).json(addedProduct);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getCart, addToCart };
