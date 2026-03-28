const { v4: uuidv4 } = require('uuid');

/**
 * In-memory data store for Farmers
 * Each farmer object contains: id, name, email, phone, location, crops, createdAt
 */
const farmers = [
  {
    id: 'f001',
    name: 'Nimal Perera',
    email: 'nimal@farm.lk',
    phone: '+94771234567',
    location: 'Anuradhapura',
    crops: ['Rice', 'Maize'],
    createdAt: '2026-01-15T08:30:00.000Z',
    updatedAt: '2026-01-15T08:30:00.000Z',
  },
  {
    id: 'f002',
    name: 'Kamala Silva',
    email: 'kamala@farm.lk',
    phone: '+94779876543',
    location: 'Kurunegala',
    crops: ['Tea', 'Cinnamon'],
    createdAt: '2026-02-10T10:00:00.000Z',
    updatedAt: '2026-02-10T10:00:00.000Z',
  },
];

/**
 * Retrieve all farmers
 * @returns {Array} - List of all farmers
 */
const getAllFarmers = () => farmers;

/**
 * Find a farmer by ID
 * @param {string} id - Farmer ID
 * @returns {Object|undefined} - Farmer object or undefined
 */
const getFarmerById = (id) => farmers.find((f) => f.id === id);

/**
 * Create a new farmer
 * @param {Object} data - Farmer data
 * @returns {Object} - Newly created farmer
 */
const createFarmer = (data) => {
  const newFarmer = {
    id: uuidv4(),
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    location: data.location || null,
    crops: data.crops || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  farmers.push(newFarmer);
  return newFarmer;
};

module.exports = {
  getAllFarmers,
  getFarmerById,
  createFarmer,
};
