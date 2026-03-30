const BuyerService = require('../services/buyerService');

/**
 * @desc    Get all buyers
 * @route   GET /buyers
 */
exports.getAllBuyers = async (req, res) => {
  try {
    const result = await BuyerService.getAllBuyers();
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
 * @desc    Get a buyer by ID
 * @route   GET /buyers/:id
 */
exports.getBuyerById = async (req, res) => {
  try {
    const result = await BuyerService.getBuyerById(req.params.id);
    if (!result.success) {
      return res.status(404).json(result);
    }
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
 * @desc    Register a new buyer
 * @route   POST /buyers
 */
exports.createBuyer = async (req, res) => {
  try {
    const result = await BuyerService.createBuyer(req.body);
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
