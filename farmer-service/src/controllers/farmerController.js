const FarmerService = require('../services/farmerService');

/**
 * @desc    Get all farmers
 * @route   GET /farmers
 */
exports.getAllFarmers = async (req, res) => {
  try {
    const result = await FarmerService.getAllFarmers();
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
 * @desc    Get a farmer by ID
 * @route   GET /farmers/:id
 */
exports.getFarmerById = async (req, res) => {
  try {
    const result = await FarmerService.getFarmerById(req.params.id);
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
 * @desc    Register a new farmer
 * @route   POST /farmers
 */
exports.createFarmer = async (req, res) => {
  try {
    const result = await FarmerService.createFarmer(req.body);
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
