const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`\n╔══════════════════════════════════════════════════════╗`);
  console.log(`║   🌾 Smart Agriculture Supply Chain - API Gateway    ║`);
  console.log(`╠══════════════════════════════════════════════════════╣`);
  console.log(`║  Gateway running on   : http://localhost:${PORT}          ║`);
  console.log(`║  Swagger Docs         : http://localhost:${PORT}/api-docs ║`);
  console.log(`║  Health Check         : http://localhost:${PORT}/health   ║`);
  console.log(`╠══════════════════════════════════════════════════════╣`);
  console.log(`║  Proxied Services:                                  ║`);
  console.log(`║    /api/farmers      → Farmer Service     :5001     ║`);
  console.log(`║    /api/buyers       → Buyer Service      :5002     ║`);
  console.log(`║    /api/marketplace  → Marketplace Service:5003     ║`);
  console.log(`║    /api/logistics    → Logistics Service  :5004     ║`);
  console.log(`║    /api/prediction   → Prediction Service :5005     ║`);
  console.log(`╚══════════════════════════════════════════════════════╝\n`);
});
