const express = require('express');
const { param, body } = require('express-validator');
const router = express.Router();
const predictionController = require('../controllers/predictionController');
const validate = require('../middleware/validator');

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
 *     CropInput:
 *       type: object
 *       required:
 *         - name
 *         - basePrice
 *       properties:
 *         name:
 *           type: string
 *           example: "Wheat"
 *         basePrice:
 *           type: number
 *           example: 150.00
 *         currency:
 *           type: string
 *           example: "LKR"
 *         unit:
 *           type: string
 *           example: "per kg"
 *         season:
 *           type: string
 *           example: "Maha"
 *         demandLevel:
 *           type: string
 *           example: "Medium"
 *         volatility:
 *           type: number
 *           example: 0.1
 *         historicalPrices:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/HistoricalPrice'
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
router.get('/predict/:crop', 
  [
    param('crop').isString().withMessage('Crop name must be a string').trim().notEmpty().withMessage('Crop name is required')
  ],
  validate,
  predictionController.predictPrice
);

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

/**
 * @swagger
 * /crops/{id}:
 *   get:
 *     summary: Get a crop by ID
 *     tags: [Prediction]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Crop ID
 *     responses:
 *       200:
 *         description: Crop found
 *       404:
 *         description: Crop not found
 */
router.get('/crops/:id', predictionController.getCropById);

/**
 * @swagger
 * /crops:
 *   post:
 *     summary: Create a new crop entry for prediction
 *     tags: [Prediction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CropInput'
 *     responses:
 *       201:
 *         description: Crop created successfully
 *       400:
 *         description: Validation error
 */
router.post('/crops',
  [
    body('name').notEmpty().withMessage('Crop name is required').trim(),
    body('basePrice').isNumeric().withMessage('Base price must be a number'),
    body('currency').optional().isString().withMessage('Currency must be a string'),
    body('unit').optional().isString().withMessage('Unit must be a string'),
    body('season').optional().isString().withMessage('Season must be a string'),
    body('demandLevel').optional().isString().withMessage('Demand level must be a string'),
    body('volatility').optional().isFloat({ min: 0, max: 1 }).withMessage('Volatility must be a number between 0 and 1'),
    body('historicalPrices').optional().isArray().withMessage('Historical prices must be an array')
  ],
  validate,
  predictionController.createCrop
);

/**
 * @swagger
 * /crops/{id}:
 *   put:
 *     summary: Update an existing crop
 *     tags: [Prediction]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Crop ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CropInput'
 *     responses:
 *       200:
 *         description: Crop updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Crop not found
 */
router.put('/crops/:id',
  [
    body('name').optional().notEmpty().withMessage('Crop name cannot be empty').trim(),
    body('basePrice').optional().isNumeric().withMessage('Base price must be a number'),
    body('currency').optional().isString().withMessage('Currency must be a string'),
    body('unit').optional().isString().withMessage('Unit must be a string'),
    body('season').optional().isString().withMessage('Season must be a string'),
    body('demandLevel').optional().isString().withMessage('Demand level must be a string'),
    body('volatility').optional().isFloat({ min: 0, max: 1 }).withMessage('Volatility must be a number between 0 and 1'),
    body('historicalPrices').optional().isArray().withMessage('Historical prices must be an array')
  ],
  validate,
  predictionController.updateCrop
);

/**
 * @swagger
 * /crops/{id}:
 *   delete:
 *     summary: Delete a crop
 *     tags: [Prediction]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Crop ID
 *     responses:
 *       200:
 *         description: Crop deleted successfully
 *       404:
 *         description: Crop not found
 */
router.delete('/crops/:id', predictionController.deleteCrop);

module.exports = router;
