const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
const swaggerUi = require('swagger-ui-express');
const buildSwaggerSpec = require('./swagger');
require('dotenv').config();

const app = express();

// ─── Middleware ───────────────────────────────────────────────
// Note: We intentionally do NOT use express.json() here.
// The gateway is a pure proxy — parsing the body would consume
// the raw stream and prevent it from being forwarded downstream.
app.use(cors());
app.use(morgan('dev'));

// ─── Swagger Documentation ──────────────────────────────────
const swaggerDocs = buildSwaggerSpec(process.env.PORT || 8080);
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

// ─── Service Proxy Routes ───────────────────────────────────
app.use('/api/farmers', createServiceProxy(process.env.FARMER_SERVICE_URL, '/farmers'));
app.use('/api/buyers', createServiceProxy(process.env.BUYER_SERVICE_URL, '/buyers'));
app.use('/api/marketplace', createServiceProxy(process.env.MARKETPLACE_SERVICE_URL, ''));
app.use('/api/logistics', createServiceProxy(process.env.LOGISTICS_SERVICE_URL, ''));
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
