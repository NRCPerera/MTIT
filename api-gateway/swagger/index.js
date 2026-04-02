const swaggerJsDoc = require('swagger-jsdoc');

// Import schemas
const schemas = require('./schemas');

// Import path definitions from each service
const gatewayPaths = require('./gateway.paths');
const farmerPaths = require('./farmer.paths');
const buyerPaths = require('./buyer.paths');
const marketplacePaths = require('./marketplace.paths');
const logisticsPaths = require('./logistics.paths');
const predictionPaths = require('./prediction.paths');

/**
 * Build and export the Swagger specification
 * Merges all service path definitions into a single OpenAPI spec
 */
const buildSwaggerSpec = (port) => {
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
          url: `http://localhost:${port}`,
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
        schemas,
      },
      paths: {
        ...gatewayPaths,
        ...farmerPaths,
        ...buyerPaths,
        ...marketplacePaths,
        ...logisticsPaths,
        ...predictionPaths,
      },
    },
    apis: [],
  };

  return swaggerJsDoc(swaggerOptions);
};

module.exports = buildSwaggerSpec;
