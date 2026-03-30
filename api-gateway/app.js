const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
require('dotenv').config();

const app = express();

// ─── Middleware ───────────────────────────────────────────────
// Note: We intentionally do NOT use express.json() here.
// The gateway is a pure proxy — parsing the body would consume
// the raw stream and prevent it from being forwarded downstream.
app.use(cors());
app.use(morgan('dev'));

// ─── Swagger Configuration ───────────────────────────────────
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Smart Agriculture Supply Chain - API Gateway',
      version: '1.0.0',
      description:
        'Centralized API Gateway that routes requests to all microservices in the Smart Agriculture Supply Chain System.',
      contact: {
        name: 'API Support',
        email: 'support@smartagri.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 8080}`,
        description: 'API Gateway',
      },
    ],
    tags: [
      { name: 'Gateway', description: 'API Gateway health and info' },
      { name: 'Farmers', description: 'Proxied to Farmer Service (port 5001)' },
      { name: 'Buyers', description: 'Proxied to Buyer Service (port 5002)' },
      { name: 'Marketplace', description: 'Proxied to Marketplace Service (port 5003)' },
      { name: 'Logistics', description: 'Proxied to Logistics Service (port 5004)' },
      { name: 'Prediction', description: 'Proxied to Price Prediction Service (port 5005)' },
    ],
    components: {
      schemas: {
        FarmerInput: {
          type: 'object',
          required: ['name', 'email'],
          properties: {
            name: { type: 'string', example: 'Sunil Fernando' },
            email: { type: 'string', example: 'sunil@farm.lk' },
            phone: { type: 'string', example: '+94775551234' },
            location: { type: 'string', example: 'Polonnaruwa' },
            crops: {
              type: 'array',
              items: { type: 'string' },
              example: ['Vegetables', 'Paddy'],
            },
          },
        },
        BuyerInput: {
          type: 'object',
          required: ['name', 'email'],
          properties: {
            name: { type: 'string', example: 'Export Lanka Ltd' },
            email: { type: 'string', example: 'info@exportlanka.lk' },
            phone: { type: 'string', example: '+94114567890' },
            company: { type: 'string', example: 'Export Lanka Holdings' },
            buyerType: {
              type: 'string',
              enum: ['Wholesale', 'Retail', 'Export'],
              example: 'Export',
            },
            preferredCrops: {
              type: 'array',
              items: { type: 'string' },
              example: ['Tea', 'Cinnamon'],
            },
          },
        },
        ProductInput: {
          type: 'object',
          required: ['farmerId', 'cropName', 'quantity', 'pricePerUnit'],
          properties: {
            farmerId: { type: 'string', example: 'f001' },
            cropName: { type: 'string', example: 'Red Rice' },
            category: { type: 'string', example: 'Grains' },
            quantity: { type: 'number', example: 300 },
            unit: { type: 'string', example: 'kg' },
            pricePerUnit: { type: 'number', example: 180.00 },
            currency: { type: 'string', example: 'LKR' },
            description: { type: 'string', example: 'Freshly harvested red rice' },
            harvestDate: { type: 'string', example: '2026-03-15' },
          },
        },
        OrderInput: {
          type: 'object',
          required: ['buyerId', 'productId', 'quantity'],
          properties: {
            buyerId: { type: 'string', example: 'b001' },
            productId: { type: 'string', example: 'p001' },
            quantity: { type: 'number', example: 100 },
            deliveryAddress: { type: 'string', example: '12 Harbor Rd, Galle' },
          },
        },
        DeliveryInput: {
          type: 'object',
          required: ['orderId', 'pickupAddress', 'deliveryAddress'],
          properties: {
            orderId: { type: 'string', example: 'ord001' },
            farmerId: { type: 'string', example: 'f001' },
            buyerId: { type: 'string', example: 'b001' },
            pickupAddress: { type: 'string', example: 'Farm 12, Anuradhapura' },
            deliveryAddress: { type: 'string', example: '45 Market Rd, Colombo 05' },
            estimatedDeliveryDate: { type: 'string', example: '2026-03-25T10:00:00.000Z' },
            driverName: { type: 'string', example: 'Kasun Bandara' },
            driverPhone: { type: 'string', example: '+94771112233' },
            vehicleNumber: { type: 'string', example: 'WP-KA-5678' },
          },
        },
      },
    },
    paths: {
      '/health': {
        get: {
          tags: ['Gateway'],
          summary: 'Health check',
          responses: {
            200: {
              description: 'Gateway is healthy',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      status: { type: 'string', example: 'UP' },
                      service: { type: 'string', example: 'api-gateway' },
                      timestamp: { type: 'string', example: '2026-03-23T00:00:00.000Z' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/farmers': {
        get: {
          tags: ['Farmers'],
          summary: 'Get all farmers (proxied)',
          description: 'Proxied to Farmer Service → GET /farmers',
          responses: { 200: { description: 'List of farmers' } },
        },
        post: {
          tags: ['Farmers'],
          summary: 'Register a new farmer (proxied)',
          description: 'Proxied to Farmer Service → POST /farmers',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/FarmerInput' },
              },
            },
          },
          responses: { 201: { description: 'Farmer created' }, 400: { description: 'Validation error' } },
        },
      },
      '/api/farmers/{id}': {
        get: {
          tags: ['Farmers'],
          summary: 'Get a farmer by ID (proxied)',
          description: 'Proxied to Farmer Service → GET /farmers/:id',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' }, example: 'f001' },
          ],
          responses: { 200: { description: 'Farmer found' }, 404: { description: 'Farmer not found' } },
        },
      },
      '/api/buyers': {
        get: {
          tags: ['Buyers'],
          summary: 'Get all buyers (proxied)',
          responses: { 200: { description: 'List of buyers' } },
        },
        post: {
          tags: ['Buyers'],
          summary: 'Register a new buyer (proxied)',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/BuyerInput' },
              },
            },
          },
          responses: { 201: { description: 'Buyer created' }, 400: { description: 'Validation error' } },
        },
      },
      '/api/buyers/{id}': {
        get: {
          tags: ['Buyers'],
          summary: 'Get a buyer by ID (proxied)',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' }, example: 'b001' },
          ],
          responses: { 200: { description: 'Buyer found' }, 404: { description: 'Buyer not found' } },
        },
      },
      '/api/marketplace/products': {
        get: {
          tags: ['Marketplace'],
          summary: 'Get all products (proxied)',
          responses: { 200: { description: 'List of products' } },
        },
        post: {
          tags: ['Marketplace'],
          summary: 'Create a product listing (proxied)',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ProductInput' },
              },
            },
          },
          responses: { 201: { description: 'Product created' }, 400: { description: 'Validation error' } },
        },
      },
      '/api/marketplace/orders': {
        get: {
          tags: ['Marketplace'],
          summary: 'Get all orders (proxied)',
          responses: { 200: { description: 'List of orders' } },
        },
        post: {
          tags: ['Marketplace'],
          summary: 'Place an order (proxied)',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/OrderInput' },
              },
            },
          },
          responses: { 201: { description: 'Order placed' }, 400: { description: 'Validation error' } },
        },
      },
      '/api/logistics/deliveries': {
        get: {
          tags: ['Logistics'],
          summary: 'Get all deliveries (proxied)',
          responses: { 200: { description: 'List of deliveries' } },
        },
        post: {
          tags: ['Logistics'],
          summary: 'Create a delivery (proxied)',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/DeliveryInput' },
              },
            },
          },
          responses: { 201: { description: 'Delivery created' }, 400: { description: 'Validation error' } },
        },
      },
      '/api/logistics/deliveries/{id}': {
        get: {
          tags: ['Logistics'],
          summary: 'Track a delivery (proxied)',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: { 200: { description: 'Delivery details' } },
        },
      },
      '/api/prediction/predict/{crop}': {
        get: {
          tags: ['Prediction'],
          summary: 'Predict crop price (proxied)',
          parameters: [
            { name: 'crop', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: { 200: { description: 'Price prediction result' } },
        },
      },
    },
  },
  apis: [],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Smart Agri - API Gateway Docs',
}));

// ─── Health Check ────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    service: 'api-gateway',
    timestamp: new Date().toISOString(),
    routes: {
      farmers: process.env.FARMER_SERVICE_URL,
      buyers: process.env.BUYER_SERVICE_URL,
      marketplace: process.env.MARKETPLACE_SERVICE_URL,
      logistics: process.env.LOGISTICS_SERVICE_URL,
      prediction: process.env.PREDICTION_SERVICE_URL,
    },
  });
});

// ─── Proxy Configuration ────────────────────────────────────
const createServiceProxy = (target, servicePrefix) => {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: (path, req) => {
      // Express strips the mount path, so req.url is the remainder
      // e.g., /api/farmers/:id → req.url = /:id (after mount strip)
      // We need to prepend the service prefix
      const newPath = servicePrefix + req.url;
      console.log(`[Gateway] Proxying: ${req.baseUrl}${req.url} → ${target}${newPath}`);
      return newPath;
    },
    on: {
      error: (err, req, res) => {
        console.error(`[Gateway] Proxy error: ${err.message}`);
        res.status(503).json({
          success: false,
          error: 'Service Unavailable',
          message: 'The target service is currently unavailable. Please try again later.',
        });
      },
    },
  });
};

// Route: /api/farmers → Farmer Service (:5001/farmers)
app.use('/api/farmers', createServiceProxy(process.env.FARMER_SERVICE_URL, '/farmers'));

// Route: /api/buyers → Buyer Service (:5002/buyers)
app.use('/api/buyers', createServiceProxy(process.env.BUYER_SERVICE_URL, '/buyers'));

// Route: /api/marketplace → Marketplace Service (:5003/)
app.use('/api/marketplace', createServiceProxy(process.env.MARKETPLACE_SERVICE_URL, ''));

// Route: /api/logistics → Logistics Service (:5004/)
app.use('/api/logistics', createServiceProxy(process.env.LOGISTICS_SERVICE_URL, ''));

// Route: /api/prediction → Prediction Service (:5005/)
app.use('/api/prediction', createServiceProxy(process.env.PREDICTION_SERVICE_URL, ''));

// ─── 404 Handler ─────────────────────────────────────────────
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found on API Gateway`,
    availableRoutes: [
      '/api/farmers',
      '/api/buyers',
      '/api/marketplace',
      '/api/logistics',
      '/api/prediction',
      '/api-docs',
      '/health',
    ],
  });
});

// ─── Global Error Handler ────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(`[Gateway] Error: ${err.message}`);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: err.message,
  });
});

module.exports = app;
