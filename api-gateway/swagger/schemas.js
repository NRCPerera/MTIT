/**
 * Shared Swagger component schemas used across all services
 */
module.exports = {
  FarmerInput: {
    type: 'object',
    required: ['name', 'email'],
    properties: {
      name: { type: 'string', example: 'Sunil Fernando' },
      email: { type: 'string', example: 'sunil@farm.lk' },
      phone: { type: 'string', example: '+94775551234' },
      location: { type: 'string', example: 'Polonnaruwa' },
      crops: {
        type: 'array',
        items: { type: 'string' },
        example: ['Vegetables', 'Paddy'],
      },
    },
  },
  BuyerInput: {
    type: 'object',
    required: ['name', 'email'],
    properties: {
      name: { type: 'string', example: 'Export Lanka Ltd' },
      email: { type: 'string', example: 'info@exportlanka.lk' },
      phone: { type: 'string', example: '+94114567890' },
      company: { type: 'string', example: 'Export Lanka Holdings' },
      buyerType: {
        type: 'string',
        enum: ['Wholesale', 'Retail', 'Export'],
        example: 'Export',
      },
      preferredCrops: {
        type: 'array',
        items: { type: 'string' },
        example: ['Tea', 'Cinnamon'],
      },
    },
  },
  ProductInput: {
    type: 'object',
    required: ['farmerId', 'cropName', 'quantity', 'pricePerUnit'],
    properties: {
      farmerId: { type: 'string', example: 'f001' },
      cropName: { type: 'string', example: 'Red Rice' },
      category: { type: 'string', example: 'Grains' },
      quantity: { type: 'number', example: 300 },
      unit: { type: 'string', example: 'kg' },
      pricePerUnit: { type: 'number', example: 180.00 },
      currency: { type: 'string', example: 'LKR' },
      description: { type: 'string', example: 'Freshly harvested red rice' },
      harvestDate: { type: 'string', example: '2026-03-15' },
    },
  },
  OrderInput: {
    type: 'object',
    required: ['buyerId', 'productId', 'quantity'],
    properties: {
      buyerId: { type: 'string', example: 'b001' },
      productId: { type: 'string', example: 'p001' },
      quantity: { type: 'number', example: 100 },
      deliveryAddress: { type: 'string', example: '12 Harbor Rd, Galle' },
    },
  },
  DeliveryInput: {
    type: 'object',
    required: ['orderId', 'pickupAddress', 'deliveryAddress'],
    properties: {
      orderId: { type: 'string', example: 'ord001' },
      farmerId: { type: 'string', example: 'f001' },
      buyerId: { type: 'string', example: 'b001' },
      pickupAddress: { type: 'string', example: 'Farm 12, Anuradhapura' },
      deliveryAddress: { type: 'string', example: '45 Market Rd, Colombo 05' },
      estimatedDeliveryDate: { type: 'string', example: '2026-03-25T10:00:00.000Z' },
      driverName: { type: 'string', example: 'Kasun Bandara' },
      driverPhone: { type: 'string', example: '+94771112233' },
      vehicleNumber: { type: 'string', example: 'WP-KA-5678' },
    },
  },
  CropInput: {
    type: 'object',
    required: ['name', 'basePrice'],
    properties: {
      name: { type: 'string', example: 'Wheat' },
      basePrice: { type: 'number', example: 150.00 },
      currency: { type: 'string', example: 'LKR' },
      unit: { type: 'string', example: 'per kg' },
      season: { type: 'string', example: 'Maha' },
      demandLevel: { type: 'string', example: 'Medium' },
      volatility: { type: 'number', example: 0.1 },
    },
  },
};
