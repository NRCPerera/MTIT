# 🌾 Smart Agriculture Supply Chain System

A complete **Node.js microservices-based backend system** for managing the agriculture supply chain — from farm to table.

## 🏗️ Architecture Overview

```
                    ┌──────────────────────┐
                    │    API Gateway        │
                    │    Port: 8080         │
                    └───────┬──────────────┘
                            │
         ┌──────────────────┼──────────────────┐
         │                  │                  │
    ┌────▼────┐      ┌─────▼─────┐     ┌─────▼──────┐
    │ Farmer  │      │  Buyer    │     │Marketplace │
    │ Service │      │ Service   │     │  Service   │
    │ :5001   │      │ :5002     │     │  :5003     │
    └─────────┘      └───────────┘     └────────────┘
         │                                     │
    ┌────▼────────┐                   ┌────────▼────┐
    │ Logistics   │                   │ Prediction  │
    │  Service    │                   │  Service    │
    │  :5004      │                   │  :5005      │
    └─────────────┘                   └─────────────┘
```

## 📦 Microservices

| Service              | Port | Description                           |
| -------------------- | ---- | ------------------------------------- |
| **API Gateway**      | 8080 | Central gateway routing all requests  |
| **Farmer Service**   | 5001 | Manages farmers and crop listings     |
| **Buyer Service**    | 5002 | Manages buyer registrations           |
| **Marketplace**      | 5003 | Handles product listings and orders   |
| **Logistics**        | 5004 | Manages deliveries and tracking       |
| **Price Prediction** | 5005 | Simulates crop price predictions      |

## 🛣️ API Gateway Routes

| Gateway Route        | Target Service         |
| -------------------- | ---------------------- |
| `/api/farmers`       | Farmer Service (:5001) |
| `/api/buyers`        | Buyer Service (:5002)  |
| `/api/marketplace`   | Marketplace (:5003)    |
| `/api/logistics`     | Logistics (:5004)      |
| `/api/prediction`    | Prediction (:5005)     |

## 📁 Folder Structure

```
smart-agri-system/
├── api-gateway/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── farmer-service/
│   ├── src/
│   │   ├── config/index.js
│   │   ├── controllers/farmerController.js
│   │   ├── models/farmerModel.js
│   │   ├── routes/farmerRoutes.js
│   │   └── services/farmerService.js
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── buyer-service/
│   ├── src/
│   │   ├── config/index.js
│   │   ├── controllers/buyerController.js
│   │   ├── models/buyerModel.js
│   │   ├── routes/buyerRoutes.js
│   │   └── services/buyerService.js
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── marketplace-service/
│   ├── src/
│   │   ├── config/index.js
│   │   ├── controllers/marketplaceController.js
│   │   ├── models/marketplaceModel.js
│   │   ├── routes/marketplaceRoutes.js
│   │   └── services/marketplaceService.js
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── logistics-service/
│   ├── src/
│   │   ├── config/index.js
│   │   ├── controllers/logisticsController.js
│   │   ├── models/logisticsModel.js
│   │   ├── routes/logisticsRoutes.js
│   │   └── services/logisticsService.js
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── prediction-service/
│   ├── src/
│   │   ├── config/index.js
│   │   ├── controllers/predictionController.js
│   │   ├── models/predictionModel.js
│   │   ├── routes/predictionRoutes.js
│   │   └── services/predictionService.js
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **MongoDB** (Running on localhost:27017 or provide MONGODB_URI in .env)

### Installation

Install dependencies for **each service** by running the following commands:

```bash
# Install API Gateway dependencies
cd api-gateway
npm install

# Install Farmer Service dependencies
cd ../farmer-service
npm install

# Install Buyer Service dependencies
cd ../buyer-service
npm install

# Install Marketplace Service dependencies
cd ../marketplace-service
npm install

# Install Logistics Service dependencies
cd ../logistics-service
npm install

# Install Prediction Service dependencies
cd ../prediction-service
npm install
```

### Running the Services

**Start each service in a separate terminal window:**

```bash
# Terminal 1 - Farmer Service
cd farmer-service
npm start

# Terminal 2 - Buyer Service
cd buyer-service
npm start

# Terminal 3 - Marketplace Service
cd marketplace-service
npm start

# Terminal 4 - Logistics Service
cd logistics-service
npm start

# Terminal 5 - Prediction Service
cd prediction-service
npm start

# Terminal 6 - API Gateway (start LAST)
cd api-gateway
npm start
```

## 📖 Swagger Documentation

Each service has its own Swagger UI:

| Service            | Swagger URL                          |
| ------------------ | ------------------------------------ |
| API Gateway        | http://localhost:8080/api-docs       |
| Farmer Service     | http://localhost:5001/api-docs       |
| Buyer Service      | http://localhost:5002/api-docs       |
| Marketplace        | http://localhost:5003/api-docs       |
| Logistics          | http://localhost:5004/api-docs       |
| Price Prediction   | http://localhost:5005/api-docs       |

## 🧪 API Endpoints

### Farmer Service (via Gateway)
```
POST http://localhost:8080/api/farmers
GET  http://localhost:8080/api/farmers
GET  http://localhost:8080/api/farmers/:id
```

### Buyer Service (via Gateway)
```
POST http://localhost:8080/api/buyers
GET  http://localhost:8080/api/buyers
```

### Marketplace Service (via Gateway)
```
POST http://localhost:8080/api/marketplace/products
GET  http://localhost:8080/api/marketplace/products
POST http://localhost:8080/api/marketplace/orders
```

### Logistics Service (via Gateway)
```
POST http://localhost:8080/api/logistics/deliveries
GET  http://localhost:8080/api/logistics/deliveries/:id
```

### Price Prediction Service (via Gateway)
```
GET  http://localhost:8080/api/prediction/predict/:crop
GET  http://localhost:8080/api/prediction/crops
```

## 📬 Sample API Requests

### Create a Farmer
```json
POST http://localhost:8080/api/farmers
Content-Type: application/json

{
  "name": "Sunil Fernando",
  "email": "sunil@farm.lk",
  "phone": "+94775551234",
  "location": "Polonnaruwa",
  "crops": ["Vegetables", "Paddy"]
}
```

### Create a Buyer
```json
POST http://localhost:8080/api/buyers
Content-Type: application/json

{
  "name": "Export Lanka Ltd",
  "email": "info@exportlanka.lk",
  "phone": "+94114567890",
  "company": "Export Lanka Holdings",
  "buyerType": "Export",
  "preferredCrops": ["Tea", "Cinnamon"]
}
```

### Create a Product Listing
```json
POST http://localhost:8080/api/marketplace/products
Content-Type: application/json

{
  "farmerId": "f001",
  "cropName": "Red Rice",
  "category": "Grains",
  "quantity": 300,
  "unit": "kg",
  "pricePerUnit": 180.00,
  "description": "Freshly harvested organic red rice"
}
```

### Place an Order
```json
POST http://localhost:8080/api/marketplace/orders
Content-Type: application/json

{
  "buyerId": "b001",
  "productId": "p001",
  "quantity": 100,
  "deliveryAddress": "12 Harbor Rd, Galle"
}
```

### Create a Delivery
```json
POST http://localhost:8080/api/logistics/deliveries
Content-Type: application/json

{
  "orderId": "ord001",
  "farmerId": "f001",
  "buyerId": "b001",
  "pickupAddress": "Farm 12, Anuradhapura",
  "deliveryAddress": "45 Market Rd, Colombo 05",
  "estimatedDeliveryDate": "2026-03-25T10:00:00.000Z",
  "driverName": "Kasun Bandara",
  "vehicleNumber": "WP-KA-5678"
}
```

### Predict Crop Price
```
GET http://localhost:8080/api/prediction/predict/rice
GET http://localhost:8080/api/prediction/predict/tea
GET http://localhost:8080/api/prediction/predict/cinnamon
```

## ⚙️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **API Gateway**: http-proxy-middleware
- **Documentation**: Swagger (OpenAPI 3.0)
- **Architecture**: Microservices
- **Pattern**: MVC (Model-View-Controller)
- **Data Storage**: MongoDB with Mongoose ODM
- **Configuration**: dotenv

## 📝 License

This project is for academic purposes.
