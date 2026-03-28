const app = require('./app');
const config = require('./src/config');

app.listen(config.port, () => {
  console.log(`\n📊 [${config.serviceName}] running on http://localhost:${config.port}`);
  console.log(`📖 Swagger Docs: http://localhost:${config.port}/api-docs`);
  console.log(`💚 Health Check:  http://localhost:${config.port}/health\n`);
});
