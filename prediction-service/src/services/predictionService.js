const Crop = require('../models/predictionModel');

/**
 * Service layer for Price Prediction operations with MongoDB
 * Simulates crop price prediction using simple statistical methods
 */
class PredictionService {
  /**
   * Predict the price for a given crop
   * Uses base price, volatility, seasonal factor, and simulated trend
   * @param {string} cropName
   * @returns {Promise<Object>}
   */
  static async predictPrice(cropName) {
    const key = cropName.toLowerCase().replace(/\s+/g, '');
    const cropData = await Crop.findOne({ key });

    if (!cropData) {
      const allCrops = await Crop.find();
      return {
        success: false,
        error: `Crop '${cropName}' is not supported for prediction`,
        supportedCrops: allCrops.map((c) => c.name),
      };
    }

    // Simulate price prediction
    const { basePrice, volatility, historicalPrices } = cropData;

    // Calculate trend from historical data
    const prices = historicalPrices.map((h) => h.price);
    const avgPrice = prices.length > 0 ? (prices.reduce((sum, p) => sum + p, 0) / prices.length) : basePrice;
    const trend = prices.length > 1 ? (((prices[prices.length - 1] - prices[0]) / prices[0]) * 100) : 0;

    // Simulated prediction with random variance
    const randomFactor = 1 + (Math.random() * volatility * 2 - volatility);
    const predictedPrice = Math.round(basePrice * randomFactor * 100) / 100;

    // Confidence based on volatility (lower volatility = higher confidence)
    const confidence = Math.round((1 - volatility) * 100);

    // Price range
    const minPrice = Math.round(basePrice * (1 - volatility) * 100) / 100;
    const maxPrice = Math.round(basePrice * (1 + volatility) * 100) / 100;

    // Market recommendation
    let recommendation;
    if (predictedPrice > avgPrice * 1.05) {
      recommendation = 'SELL - Predicted price is above average. Good time to sell.';
    } else if (predictedPrice < avgPrice * 0.95) {
      recommendation = 'HOLD - Predicted price is below average. Consider holding stock.';
    } else {
      recommendation = 'NEUTRAL - Price is near average levels. Monitor market trends.';
    }

    return {
      success: true,
      data: {
        crop: cropData.name,
        currentBasePrice: basePrice,
        predictedPrice,
        currency: cropData.currency,
        unit: cropData.unit,
        priceRange: {
          min: minPrice,
          max: maxPrice,
        },
        confidence: `${confidence}%`,
        trend: `${trend > 0 ? '+' : ''}${trend.toFixed(2)}%`,
        trendDirection: trend > 0 ? 'Upward' : trend < 0 ? 'Downward' : 'Stable',
        demandLevel: cropData.demandLevel,
        season: cropData.season,
        recommendation,
        historicalPrices: cropData.historicalPrices,
        predictionDate: new Date().toISOString(),
        algorithm: 'Simulated Statistical Model (Monte Carlo)',
        disclaimer:
          'This prediction is simulated for demonstration purposes and should not be used for actual trading decisions.',
      },
    };
  }

  /**
   * Get all supported crops for prediction
   * @returns {Promise<Object>}
   */
  static async getSupportedCrops() {
    const crops = await Crop.find();
    return {
      success: true,
      count: crops.length,
      data: crops,
    };
  }
}

module.exports = PredictionService;
