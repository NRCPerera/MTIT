const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const farmerRoutes = require('./src/routes/farmerRoutes');
const config = require('./src/config');

const app = express();

// ─── Middleware ───────────────────────────────────────────────
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Swagger Configuration ───────────────────────────────────
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Farmer Service API',
      version: '1.0.0',
      description: 'Microservice for managing farmers and their crop listings in the Smart Agriculture Supply Chain System.',
      contact: {
        name: 'Smart Agri Team',
        email: 'support@smartagri.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: 'Farmer Service (Direct)',
      },
      {
        url: 'http://localhost:8080/api',
        description: 'Via API Gateway',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Farmer Service - API Docs',
}));

// ─── Health Check ────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    service: config.serviceName,
    port: config.port,
    timestamp: new Date().toISOString(),
  });
});

// ─── Routes ──────────────────────────────────────────────────
app.use('/farmers', farmerRoutes);

// ─── 404 Handler ─────────────────────────────────────────────
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found on ${config.serviceName}`,
  });
});

// ─── Global Error Handler ────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(`[${config.serviceName}] Error:`, err.message);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: err.message,
  });
});

module.exports = app;
