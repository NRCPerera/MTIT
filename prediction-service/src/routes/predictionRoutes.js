const express = require('express');
const router = express.Router();
const predictionController = require('../controllers/predictionController');

/**
 * @swagger
 * components:
 *   schemas:
 *     PriceRange:
 *       type: object
 *       properties:
 *         min:
 *           type: number
 *           example: 202.40
 *         max:
 *           type: number
 *           example: 237.60
 *     HistoricalPrice:
 *       type: object
 *       properties:
 *         month:
 *           type: string
 *           example: "March"
 *         price:
 *           type: number
 *           example: 225
 *     PredictionResult:
 *       type: object
 *       properties:
 *         crop:
 *           type: string
 *           example: "Rice"
 *         currentBasePrice:
 *           type: number
 *           example: 220.00
 *         predictedPrice:
 *           type: number
 *           example: 228.50
 *         currency:
 *           type: string
 *           example: "LKR"
 *         unit:
 *           type: string
 *           example: "per kg"
 *         priceRange:
 *           $ref: '#/components/schemas/PriceRange'
 *         confidence:
 *           type: string
 *           example: "92%"
 *         trend:
 *           type: string
 *           example: "+2.38%"
 *         trendDirection:
 *           type: string
 *           enum: [Upward, Downward, Stable]
 *           example: "Upward"
 *         demandLevel:
 *           type: string
 *           example: "High"
 *         season:
 *           type: string
 *           example: "Yala & Maha"
 *         recommendation:
 *           type: string
 *           example: "SELL - Predicted price is above average. Good time to sell."
 *         historicalPrices:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/HistoricalPrice'
 *         predictionDate:
 *           type: string
 *           format: date-time
 *         algorithm:
 *           type: string
 *           example: "Simulated Statistical Model (Monte Carlo)"
 *         disclaimer:
 *           type: string
 *     SupportedCrop:
 *       type: object
 *       properties:
 *         key:
 *           type: string
 *           example: "rice"
 *         name:
 *           type: string
 *           example: "Rice"
 *         basePrice:
 *           type: number
 *           example: 220.00
 *         currency:
 *           type: string
 *           example: "LKR"
 *         unit:
 *           type: string
 *           example: "per kg"
 */

/**
 * @swagger
 * /predict/{crop}:
 *   get:
 *     summary: Predict the market price for a crop
 *     tags: [Prediction]
 *     description: Uses a simulated Monte Carlo statistical model to predict crop prices based on historical data, volatility, and market trends.
 *     parameters:
 *       - in: path
 *         name: crop
 *         required: true
 *         schema:
 *           type: string
 *           enum: [rice, tea, cinnamon, coconut, pepper, rubber, maize, vegetables]
 *         description: Crop name (case insensitive)
 *         example: "rice"
 *     responses:
 *       200:
 *         description: Price prediction result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/PredictionResult'
 *       404:
 *         description: Crop not supported
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Crop 'wheat' is not supported for prediction"
 *                 supportedCrops:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Rice", "Tea", "Cinnamon", "Coconut", "Black Pepper", "Rubber", "Maize", "Mixed Vegetables"]
 */
router.get('/predict/:crop', predictionController.predictPrice);

/**
 * @swagger
 * /crops:
 *   get:
 *     summary: Get all supported crops for prediction
 *     tags: [Prediction]
 *     responses:
 *       200:
 *         description: List of supported crops
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/SupportedCrop'
 */
router.get('/crops', predictionController.getSupportedCrops);

module.exports = router;
