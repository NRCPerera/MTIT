const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const marketplaceController = require('../controllers/marketplaceController');
const validate = require('../middleware/validator');

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

// ─── Product Routes ─────────────────────────────────────────

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
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */
router.get('/products/:id', marketplaceController.getProductById);

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
router.post('/products', 
  [
    body('farmerId').notEmpty().withMessage('Farmer ID is required'),
    body('cropName').notEmpty().withMessage('Crop name is required').trim(),
    body('quantity').isNumeric().withMessage('Quantity must be a number').custom(value => value > 0).withMessage('Quantity must be greater than 0'),
    body('pricePerUnit').isNumeric().withMessage('Price per unit must be a number').custom(value => value > 0).withMessage('Price must be greater than 0'),
    body('category').optional().isString().withMessage('Category must be a string'),
    body('unit').optional().isString().withMessage('Unit must be a string'),
    body('currency').optional().isString().withMessage('Currency must be a string'),
    body('harvestDate').optional().isISO8601().withMessage('Invalid harvest date format')
  ],
  validate,
  marketplaceController.createProduct
);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Product not found
 */
router.put('/products/:id',
  [
    body('farmerId').optional().notEmpty().withMessage('Farmer ID cannot be empty'),
    body('cropName').optional().notEmpty().withMessage('Crop name cannot be empty').trim(),
    body('quantity').optional().isNumeric().withMessage('Quantity must be a number'),
    body('pricePerUnit').optional().isNumeric().withMessage('Price per unit must be a number'),
    body('category').optional().isString().withMessage('Category must be a string'),
    body('unit').optional().isString().withMessage('Unit must be a string'),
    body('currency').optional().isString().withMessage('Currency must be a string'),
    body('status').optional().isIn(['Available', 'Out of Stock', 'Sold']).withMessage('Invalid product status'),
    body('harvestDate').optional().isISO8601().withMessage('Invalid harvest date format')
  ],
  validate,
  marketplaceController.updateProduct
);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete('/products/:id', marketplaceController.deleteProduct);

// ─── Order Routes ───────────────────────────────────────────

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Successfully retrieved all orders
 */
router.get('/orders', marketplaceController.getAllOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order found
 *       404:
 *         description: Order not found
 */
router.get('/orders/:id', marketplaceController.getOrderById);

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
router.post('/orders', 
  [
    body('buyerId').notEmpty().withMessage('Buyer ID is required'),
    body('productId').isMongoId().withMessage('Valid Product ID is required'),
    body('quantity').isNumeric().withMessage('Quantity must be a number').custom(value => value > 0).withMessage('Quantity must be greater than 0'),
    body('deliveryAddress').notEmpty().withMessage('Delivery address is required').trim()
  ],
  validate,
  marketplaceController.createOrder
);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update an existing order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pending, Confirmed, Shipped, Delivered, Cancelled]
 *               deliveryAddress:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Order not found
 */
router.put('/orders/:id',
  [
    body('status').optional().isIn(['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled']).withMessage('Invalid order status'),
    body('deliveryAddress').optional().notEmpty().withMessage('Delivery address cannot be empty').trim()
  ],
  validate,
  marketplaceController.updateOrder
);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 */
router.delete('/orders/:id', marketplaceController.deleteOrder);

module.exports = router;
