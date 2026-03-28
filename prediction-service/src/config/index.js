require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5005,
  env: process.env.NODE_ENV || 'development',
  serviceName: process.env.SERVICE_NAME || 'prediction-service',
};
