const { v4: uuidv4 } = require('uuid');

/**
 * In-memory data store for Products (Crop Listings)
 */
const products = [
  {
    id: 'p001',
    farmerId: 'f001',
    cropName: 'Basmati Rice',
    category: 'Grains',
    quantity: 500,
    unit: 'kg',
    pricePerUnit: 220.0,
    currency: 'LKR',
    description: 'Organic basmati rice from Anuradhapura region',
    status: 'Available',
    harvestDate: '2026-03-01',
    createdAt: '2026-03-05T08:00:00.000Z',
    updatedAt: '2026-03-05T08:00:00.000Z',
  },
  {
    id: 'p002',
    farmerId: 'f002',
    cropName: 'Ceylon Cinnamon',
    category: 'Spices',
    quantity: 100,
    unit: 'kg',
    pricePerUnit: 3500.0,
    currency: 'LKR',
    description: 'Premium grade Ceylon cinnamon sticks',
    status: 'Available',
    harvestDate: '2026-02-20',
    createdAt: '2026-03-10T09:30:00.000Z',
    updatedAt: '2026-03-10T09:30:00.000Z',
  },
];

/**
 * In-memory data store for Orders
 */
const orders = [
  {
    id: 'ord001',
    buyerId: 'b001',
    productId: 'p001',
    quantity: 200,
    totalPrice: 44000.0,
    currency: 'LKR',
    status: 'Confirmed',
    orderDate: '2026-03-15T14:00:00.000Z',
    deliveryAddress: '45 Market Rd, Colombo 05',
    createdAt: '2026-03-15T14:00:00.000Z',
    updatedAt: '2026-03-15T14:00:00.000Z',
  },
];

// ─── Product Operations ──────────────────────────────────────
const getAllProducts = () => products;

const getProductById = (id) => products.find((p) => p.id === id);

const createProduct = (data) => {
  const newProduct = {
    id: uuidv4(),
    farmerId: data.farmerId,
    cropName: data.cropName,
    category: data.category || 'General',
    quantity: data.quantity,
    unit: data.unit || 'kg',
    pricePerUnit: data.pricePerUnit,
    currency: data.currency || 'LKR',
    description: data.description || '',
    status: 'Available',
    harvestDate: data.harvestDate || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  products.push(newProduct);
  return newProduct;
};

// ─── Order Operations ────────────────────────────────────────
const getAllOrders = () => orders;

const getOrderById = (id) => orders.find((o) => o.id === id);

const createOrder = (data) => {
  const product = getProductById(data.productId);
  const totalPrice = product ? product.pricePerUnit * data.quantity : 0;

  const newOrder = {
    id: uuidv4(),
    buyerId: data.buyerId,
    productId: data.productId,
    quantity: data.quantity,
    totalPrice,
    currency: product ? product.currency : 'LKR',
    status: 'Pending',
    orderDate: new Date().toISOString(),
    deliveryAddress: data.deliveryAddress || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  orders.push(newOrder);
  return newOrder;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  getAllOrders,
  getOrderById,
  createOrder,
};
