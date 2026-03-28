const express = require('express');
const router = express.Router();
const logisticsController = require('../controllers/logisticsController');

/**
 * @swagger
 * components:
 *   schemas:
 *     TrackingEvent:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "In Transit"
 *         location:
 *           type: string
 *           example: "Kurunegala Checkpoint"
 *         timestamp:
 *           type: string
 *           format: date-time
 *         notes:
 *           type: string
 *           example: "Passed through checkpoint"
 *     Delivery:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "del001"
 *         orderId:
 *           type: string
 *           example: "ord001"
 *         farmerId:
 *           type: string
 *           example: "f001"
 *         buyerId:
 *           type: string
 *           example: "b001"
 *         pickupAddress:
 *           type: string
 *           example: "Farm 12, Anuradhapura"
 *         deliveryAddress:
 *           type: string
 *           example: "45 Market Rd, Colombo 05"
 *         status:
 *           type: string
 *           enum: [Pending Pickup, Picked Up, In Transit, Out for Delivery, Delivered, Failed]
 *           example: "In Transit"
 *         estimatedDeliveryDate:
 *           type: string
 *           format: date-time
 *         actualDeliveryDate:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         driverName:
 *           type: string
 *           example: "Ruwan Jayasinghe"
 *         driverPhone:
 *           type: string
 *           example: "+94776543210"
 *         vehicleNumber:
 *           type: string
 *           example: "WP-CA-1234"
 *         trackingHistory:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TrackingEvent'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     DeliveryInput:
 *       type: object
 *       required:
 *         - orderId
 *         - pickupAddress
 *         - deliveryAddress
 *       properties:
 *         orderId:
 *           type: string
 *           example: "ord001"
 *         farmerId:
 *           type: string
 *           example: "f001"
 *         buyerId:
 *           type: string
 *           example: "b001"
 *         pickupAddress:
 *           type: string
 *           example: "Farm 12, Anuradhapura"
 *         deliveryAddress:
 *           type: string
 *           example: "45 Market Rd, Colombo 05"
 *         estimatedDeliveryDate:
 *           type: string
 *           example: "2026-03-25T10:00:00.000Z"
 *         driverName:
 *           type: string
 *           example: "Kasun Bandara"
 *         driverPhone:
 *           type: string
 *           example: "+94771112233"
 *         vehicleNumber:
 *           type: string
 *           example: "WP-KA-5678"
 */

/**
 * @swagger
 * /deliveries/{id}:
 *   get:
 *     summary: Track a delivery by ID
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Delivery ID
 *         example: "del001"
 *     responses:
 *       200:
 *         description: Delivery details with tracking history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Delivery'
 *       404:
 *         description: Delivery not found
 */
router.get('/deliveries/:id', logisticsController.getDeliveryById);

/**
 * @swagger
 * /deliveries:
 *   post:
 *     summary: Create a new delivery
 *     tags: [Deliveries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeliveryInput'
 *     responses:
 *       201:
 *         description: Delivery created successfully
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
 *                   $ref: '#/components/schemas/Delivery'
 *       400:
 *         description: Validation error
 */
router.post('/deliveries', logisticsController.createDelivery);

module.exports = router;
