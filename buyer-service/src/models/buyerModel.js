const { v4: uuidv4 } = require('uuid');

/**
 * In-memory data store for Buyers
 */
const buyers = [
  {
    id: 'b001',
    name: 'Lanka Fresh Pvt Ltd',
    email: 'procurement@lankafresh.lk',
    phone: '+94112345678',
    company: 'Lanka Fresh Pvt Ltd',
    buyerType: 'Wholesale',
    preferredCrops: ['Rice', 'Vegetables'],
    createdAt: '2026-01-20T09:00:00.000Z',
    updatedAt: '2026-01-20T09:00:00.000Z',
  },
  {
    id: 'b002',
    name: 'Green Mart Supermarket',
    email: 'supply@greenmart.lk',
    phone: '+94113456789',
    company: 'Green Mart Holdings',
    buyerType: 'Retail',
    preferredCrops: ['Fruits', 'Spices', 'Tea'],
    createdAt: '2026-02-05T11:30:00.000Z',
    updatedAt: '2026-02-05T11:30:00.000Z',
  },
];

/**
 * Retrieve all buyers
 * @returns {Array}
 */
const getAllBuyers = () => buyers;

/**
 * Find a buyer by ID
 * @param {string} id
 * @returns {Object|undefined}
 */
const getBuyerById = (id) => buyers.find((b) => b.id === id);

/**
 * Create a new buyer
 * @param {Object} data
 * @returns {Object}
 */
const createBuyer = (data) => {
  const newBuyer = {
    id: uuidv4(),
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    company: data.company || null,
    buyerType: data.buyerType || 'Retail',
    preferredCrops: data.preferredCrops || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  buyers.push(newBuyer);
  return newBuyer;
};

module.exports = {
  getAllBuyers,
  getBuyerById,
  createBuyer,
};
