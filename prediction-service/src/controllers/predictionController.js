const PredictionService = require('../services/predictionService');

/**
 * @desc    Predict price for a given crop
 * @route   GET /predict/:crop
 */
exports.predictPrice = async (req, res) => {
  try {
    const result = await PredictionService.predictPrice(req.params.crop);
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
 * @desc    Get all supported crops for prediction
 * @route   GET /crops
 */
exports.getSupportedCrops = async (req, res) => {
  try {
    const result = await PredictionService.getSupportedCrops();
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
 * @desc    Get a crop by ID
 * @route   GET /crops/:id
 */
exports.getCropById = async (req, res) => {
  try {
    const result = await PredictionService.getCropById(req.params.id);
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
 * @desc    Create a new crop entry
 * @route   POST /crops
 */
exports.createCrop = async (req, res) => {
  try {
    const result = await PredictionService.createCrop(req.body);
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
 * @desc    Update an existing crop
 * @route   PUT /crops/:id
 */
exports.updateCrop = async (req, res) => {
  try {
    const result = await PredictionService.updateCrop(req.params.id, req.body);
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
 * @desc    Delete a crop
 * @route   DELETE /crops/:id
 */
exports.deleteCrop = async (req, res) => {
  try {
    const result = await PredictionService.deleteCrop(req.params.id);
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
