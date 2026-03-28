const express = require('express');
const router = express.Router();
const buyerController = require('../controllers/buyerController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Buyer:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated UUID
 *           example: "b001"
 *         name:
 *           type: string
 *           example: "Lanka Fresh Pvt Ltd"
 *         email:
 *           type: string
 *           example: "procurement@lankafresh.lk"
 *         phone:
 *           type: string
 *           example: "+94112345678"
 *         company:
 *           type: string
 *           example: "Lanka Fresh Pvt Ltd"
 *         buyerType:
 *           type: string
 *           enum: [Wholesale, Retail, Export]
 *           example: "Wholesale"
 *         preferredCrops:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Rice", "Vegetables"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     BuyerInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           example: "Export Lanka Ltd"
 *         email:
 *           type: string
 *           example: "info@exportlanka.lk"
 *         phone:
 *           type: string
 *           example: "+94114567890"
 *         company:
 *           type: string
 *           example: "Export Lanka Holdings"
 *         buyerType:
 *           type: string
 *           enum: [Wholesale, Retail, Export]
 *           example: "Export"
 *         preferredCrops:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Tea", "Cinnamon"]
 */

/**
 * @swagger
 * /buyers:
 *   get:
 *     summary: Retrieve all buyers
 *     tags: [Buyers]
 *     responses:
 *       200:
 *         description: Successfully retrieved all buyers
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
 *                     $ref: '#/components/schemas/Buyer'
 */
router.get('/', buyerController.getAllBuyers);

/**
 * @swagger
 * /buyers/{id}:
 *   get:
 *     summary: Get a buyer by ID
 *     tags: [Buyers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "b001"
 *     responses:
 *       200:
 *         description: Buyer found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Buyer'
 *       404:
 *         description: Buyer not found
 */
router.get('/:id', buyerController.getBuyerById);

/**
 * @swagger
 * /buyers:
 *   post:
 *     summary: Register a new buyer
 *     tags: [Buyers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BuyerInput'
 *     responses:
 *       201:
 *         description: Buyer registered successfully
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
 *                   example: "Buyer registered successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Buyer'
 *       400:
 *         description: Validation error
 */
router.post('/', buyerController.createBuyer);

module.exports = router;
