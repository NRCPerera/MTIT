const MarketplaceService = require('../services/marketplaceService');

/**
 * @desc    Get all products
 * @route   GET /products
 */
exports.getAllProducts = async (req, res) => {
  try {
    const result = await MarketplaceService.getAllProducts();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};

/**
 * @desc    Create a new product listing
 * @route   POST /products
 */
exports.createProduct = async (req, res) => {
  try {
    const result = await MarketplaceService.createProduct(req.body);
    if (!result.success) {
      return res.status(400).json(result);
    }
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};

/**
 * @desc    Place a new order
 * @route   POST /orders
 */
exports.createOrder = async (req, res) => {
  try {
    const result = await MarketplaceService.createOrder(req.body);
    if (!result.success) {
      return res.status(400).json(result);
    }
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};

/**
 * @desc    Get all orders
 * @route   GET /orders
 */
exports.getAllOrders = async (req, res) => {
  try {
    const result = await MarketplaceService.getAllOrders();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};
