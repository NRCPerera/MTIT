const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const logisticsController = require('../controllers/logisticsController');
const validate = require('../middleware/validator');

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
 * /deliveries:
 *   get:
 *     summary: Get all deliveries
 *     tags: [Deliveries]
 *     responses:
 *       200:
 *         description: Successfully retrieved all deliveries
 */
router.get('/deliveries', logisticsController.getAllDeliveries);

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
router.post('/deliveries', 
  [
    body('orderId').notEmpty().withMessage('Order ID is required'),
    body('pickupAddress').notEmpty().withMessage('Pickup address is required').trim(),
    body('deliveryAddress').notEmpty().withMessage('Delivery address is required').trim(),
    body('estimatedDeliveryDate').optional().isISO8601().withMessage('Invalid estimated delivery date format'),
    body('driverName').optional().isString().withMessage('Driver name must be a string'),
    body('driverPhone').optional().isString().withMessage('Driver phone must be a string'),
    body('vehicleNumber').optional().isString().withMessage('Vehicle number must be a string')
  ],
  validate,
  logisticsController.createDelivery
);

/**
 * @swagger
 * /deliveries/{id}:
 *   put:
 *     summary: Update an existing delivery
 *     tags: [Deliveries]
 *     description: Updates delivery details. When the status changes, a new tracking history entry is automatically created.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Delivery ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pending Pickup, Picked Up, In Transit, Out for Delivery, Delivered, Cancelled]
 *               driverName:
 *                 type: string
 *               driverPhone:
 *                 type: string
 *               vehicleNumber:
 *                 type: string
 *               currentLocation:
 *                 type: string
 *                 description: Current location for tracking entry
 *               trackingNotes:
 *                 type: string
 *                 description: Notes for the tracking entry
 *     responses:
 *       200:
 *         description: Delivery updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Delivery not found
 */
router.put('/deliveries/:id',
  [
    body('status').optional().isIn(['Pending Pickup', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered', 'Cancelled']).withMessage('Invalid delivery status'),
    body('driverName').optional().isString().withMessage('Driver name must be a string'),
    body('driverPhone').optional().isString().withMessage('Driver phone must be a string'),
    body('vehicleNumber').optional().isString().withMessage('Vehicle number must be a string'),
    body('pickupAddress').optional().notEmpty().withMessage('Pickup address cannot be empty').trim(),
    body('deliveryAddress').optional().notEmpty().withMessage('Delivery address cannot be empty').trim(),
    body('estimatedDeliveryDate').optional().isISO8601().withMessage('Invalid estimated delivery date format')
  ],
  validate,
  logisticsController.updateDelivery
);

/**
 * @swagger
 * /deliveries/{id}:
 *   delete:
 *     summary: Delete a delivery
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Delivery ID
 *     responses:
 *       200:
 *         description: Delivery deleted successfully
 *       404:
 *         description: Delivery not found
 */
router.delete('/deliveries/:id', logisticsController.deleteDelivery);

module.exports = router;
