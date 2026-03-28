const { v4: uuidv4 } = require('uuid');

/**
 * In-memory data store for Deliveries
 */
const deliveries = [
  {
    id: 'del001',
    orderId: 'ord001',
    farmerId: 'f001',
    buyerId: 'b001',
    pickupAddress: 'Farm 12, Anuradhapura',
    deliveryAddress: '45 Market Rd, Colombo 05',
    status: 'In Transit',
    estimatedDeliveryDate: '2026-03-20T10:00:00.000Z',
    actualDeliveryDate: null,
    driverName: 'Ruwan Jayasinghe',
    driverPhone: '+94776543210',
    vehicleNumber: 'WP-CA-1234',
    trackingHistory: [
      {
        status: 'Picked Up',
        location: 'Anuradhapura Warehouse',
        timestamp: '2026-03-16T08:00:00.000Z',
        notes: 'Package collected from farmer',
      },
      {
        status: 'In Transit',
        location: 'Kurunegala Checkpoint',
        timestamp: '2026-03-16T14:30:00.000Z',
        notes: 'Passed through Kurunegala',
      },
    ],
    createdAt: '2026-03-15T15:00:00.000Z',
    updatedAt: '2026-03-16T14:30:00.000Z',
  },
];

/**
 * Get all deliveries
 * @returns {Array}
 */
const getAllDeliveries = () => deliveries;

/**
 * Find a delivery by ID
 * @param {string} id
 * @returns {Object|undefined}
 */
const getDeliveryById = (id) => deliveries.find((d) => d.id === id);

/**
 * Create a new delivery
 * @param {Object} data
 * @returns {Object}
 */
const createDelivery = (data) => {
  const newDelivery = {
    id: uuidv4(),
    orderId: data.orderId,
    farmerId: data.farmerId || null,
    buyerId: data.buyerId || null,
    pickupAddress: data.pickupAddress,
    deliveryAddress: data.deliveryAddress,
    status: 'Pending Pickup',
    estimatedDeliveryDate: data.estimatedDeliveryDate || null,
    actualDeliveryDate: null,
    driverName: data.driverName || 'To be assigned',
    driverPhone: data.driverPhone || null,
    vehicleNumber: data.vehicleNumber || null,
    trackingHistory: [
      {
        status: 'Created',
        location: data.pickupAddress,
        timestamp: new Date().toISOString(),
        notes: 'Delivery order created',
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  deliveries.push(newDelivery);
  return newDelivery;
};

module.exports = {
  getAllDeliveries,
  getDeliveryById,
  createDelivery,
};
