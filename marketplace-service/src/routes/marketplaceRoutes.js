const express = require('express');
const router = express.Router();
const marketplaceController = require('../controllers/marketplaceController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "p001"
 *         farmerId:
 *           type: string
 *           example: "f001"
 *         cropName:
 *           type: string
 *           example: "Basmati Rice"
 *         category:
 *           type: string
 *           example: "Grains"
 *         quantity:
 *           type: number
 *           example: 500
 *         unit:
 *           type: string
 *           example: "kg"
 *         pricePerUnit:
 *           type: number
 *           example: 220.00
 *         currency:
 *           type: string
 *           example: "LKR"
 *         description:
 *           type: string
 *           example: "Organic basmati rice from Anuradhapura region"
 *         status:
 *           type: string
 *           enum: [Available, Sold Out, Reserved]
 *           example: "Available"
 *         harvestDate:
 *           type: string
 *           example: "2026-03-01"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     ProductInput:
 *       type: object
 *       required:
 *         - farmerId
 *         - cropName
 *         - quantity
 *         - pricePerUnit
 *       properties:
 *         farmerId:
 *           type: string
 *           example: "f001"
 *         cropName:
 *           type: string
 *           example: "Red Rice"
 *         category:
 *           type: string
 *           example: "Grains"
 *         quantity:
 *           type: number
 *           example: 300
 *         unit:
 *           type: string
 *           example: "kg"
 *         pricePerUnit:
 *           type: number
 *           example: 180.00
 *         currency:
 *           type: string
 *           example: "LKR"
 *         description:
 *           type: string
 *           example: "Freshly harvested red rice"
 *         harvestDate:
 *           type: string
 *           example: "2026-03-15"
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "ord001"
 *         buyerId:
 *           type: string
 *           example: "b001"
 *         productId:
 *           type: string
 *           example: "p001"
 *         quantity:
 *           type: number
 *           example: 200
 *         totalPrice:
 *           type: number
 *           example: 44000.00
 *         currency:
 *           type: string
 *           example: "LKR"
 *         status:
 *           type: string
 *           enum: [Pending, Confirmed, Shipped, Delivered, Cancelled]
 *           example: "Pending"
 *         orderDate:
 *           type: string
 *           format: date-time
 *         deliveryAddress:
 *           type: string
 *           example: "45 Market Rd, Colombo 05"
 *     OrderInput:
 *       type: object
 *       required:
 *         - buyerId
 *         - productId
 *         - quantity
 *       properties:
 *         buyerId:
 *           type: string
 *           example: "b001"
 *         productId:
 *           type: string
 *           example: "p001"
 *         quantity:
 *           type: number
 *           example: 100
 *         deliveryAddress:
 *           type: string
 *           example: "12 Harbor Rd, Galle"
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all product listings
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Successfully retrieved all products
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
 *                     $ref: '#/components/schemas/Product'
 */
router.get('/products', marketplaceController.getAllProducts);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product listing
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Product listing created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Validation error
 */
router.post('/products', marketplaceController.createProduct);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Place a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderInput'
 *     responses:
 *       201:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Validation error
 */
router.post('/orders', marketplaceController.createOrder);

module.exports = router;
