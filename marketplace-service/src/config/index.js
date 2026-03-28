require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5003,
  env: process.env.NODE_ENV || 'development',
  serviceName: process.env.SERVICE_NAME || 'marketplace-service',
};
