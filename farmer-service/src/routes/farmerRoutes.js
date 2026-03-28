const express = require('express');
const router = express.Router();
const farmerController = require('../controllers/farmerController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Farmer:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated UUID
 *           example: "f001"
 *         name:
 *           type: string
 *           description: Full name of the farmer
 *           example: "Nimal Perera"
 *         email:
 *           type: string
 *           description: Email address
 *           example: "nimal@farm.lk"
 *         phone:
 *           type: string
 *           description: Phone number
 *           example: "+94771234567"
 *         location:
 *           type: string
 *           description: Farming location
 *           example: "Anuradhapura"
 *         crops:
 *           type: array
 *           items:
 *             type: string
 *           description: List of crops grown
 *           example: ["Rice", "Maize"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     FarmerInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           example: "Sunil Fernando"
 *         email:
 *           type: string
 *           example: "sunil@farm.lk"
 *         phone:
 *           type: string
 *           example: "+94775551234"
 *         location:
 *           type: string
 *           example: "Polonnaruwa"
 *         crops:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Vegetables", "Paddy"]
 */

/**
 * @swagger
 * /farmers:
 *   get:
 *     summary: Retrieve all farmers
 *     tags: [Farmers]
 *     responses:
 *       200:
 *         description: Successfully retrieved all farmers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 2
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Farmer'
 */
router.get('/', farmerController.getAllFarmers);

/**
 * @swagger
 * /farmers/{id}:
 *   get:
 *     summary: Get a farmer by ID
 *     tags: [Farmers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Farmer ID
 *         example: "f001"
 *     responses:
 *       200:
 *         description: Farmer found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Farmer'
 *       404:
 *         description: Farmer not found
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
 *                   example: "Farmer with ID 'xyz' not found"
 */
router.get('/:id', farmerController.getFarmerById);

/**
 * @swagger
 * /farmers:
 *   post:
 *     summary: Register a new farmer
 *     tags: [Farmers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FarmerInput'
 *     responses:
 *       201:
 *         description: Farmer registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Farmer registered successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Farmer'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Name is required", "Invalid email format"]
 */
router.post('/', farmerController.createFarmer);

module.exports = router;
