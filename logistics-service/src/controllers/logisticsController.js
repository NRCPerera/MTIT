const LogisticsService = require('../services/logisticsService');

/**
 * @desc    Get all deliveries
 * @route   GET /deliveries
 */
exports.getAllDeliveries = async (req, res) => {
  try {
    const result = await LogisticsService.getAllDeliveries();
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
 * @desc    Get a delivery by ID (with tracking)
 * @route   GET /deliveries/:id
 */
exports.getDeliveryById = async (req, res) => {
  try {
    const result = await LogisticsService.getDeliveryById(req.params.id);
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
 * @desc    Create a new delivery
 * @route   POST /deliveries
 */
exports.createDelivery = async (req, res) => {
  try {
    const result = await LogisticsService.createDelivery(req.body);
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
 * @desc    Update an existing delivery
 * @route   PUT /deliveries/:id
 */
exports.updateDelivery = async (req, res) => {
  try {
    const result = await LogisticsService.updateDelivery(req.params.id, req.body);
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
 * @desc    Delete a delivery
 * @route   DELETE /deliveries/:id
 */
exports.deleteDelivery = async (req, res) => {
  try {
    const result = await LogisticsService.deleteDelivery(req.params.id);
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
