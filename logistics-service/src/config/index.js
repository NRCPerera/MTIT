require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5004,
  env: process.env.NODE_ENV || 'development',
  serviceName: process.env.SERVICE_NAME || 'logistics-service',
};
