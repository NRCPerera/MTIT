require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5002,
  env: process.env.NODE_ENV || 'development',
  serviceName: process.env.SERVICE_NAME || 'buyer-service',
};
