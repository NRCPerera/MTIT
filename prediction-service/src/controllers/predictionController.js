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
