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
 * @desc    Get a farmer by farmerId
 * @route   GET /farmers/:farmerId
 */
exports.getFarmerById = async (req, res) => {
  try {
    const result = await FarmerService.getFarmerById(req.params.farmerId);
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

/**
 * @desc    Update an existing farmer
 * @route   PUT /farmers/:farmerId
 */
exports.updateFarmer = async (req, res) => {
  try {
    const result = await FarmerService.updateFarmer(req.params.farmerId, req.body);
    if (!result.success) {
      if (result.errors) {
        return res.status(400).json(result);
      }
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
 * @desc    Delete a farmer
 * @route   DELETE /farmers/:farmerId
 */
exports.deleteFarmer = async (req, res) => {
  try {
    const result = await FarmerService.deleteFarmer(req.params.farmerId);
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

