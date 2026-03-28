/**
 * Crop price data model
 * Contains base prices, seasonal factors, and market trends for simulation
 */
const cropData = {
  rice: {
    name: 'Rice',
    basePrice: 220.0,
    currency: 'LKR',
    unit: 'per kg',
    season: 'Yala & Maha',
    demandLevel: 'High',
    volatility: 0.08,
    historicalPrices: [
      { month: 'January', price: 210 },
      { month: 'February', price: 215 },
      { month: 'March', price: 225 },
      { month: 'April', price: 230 },
      { month: 'May', price: 220 },
      { month: 'June', price: 215 },
    ],
  },
  tea: {
    name: 'Tea',
    basePrice: 850.0,
    currency: 'LKR',
    unit: 'per kg',
    season: 'Year-round',
    demandLevel: 'Very High',
    volatility: 0.12,
    historicalPrices: [
      { month: 'January', price: 820 },
      { month: 'February', price: 835 },
      { month: 'March', price: 860 },
      { month: 'April', price: 870 },
      { month: 'May', price: 845 },
      { month: 'June', price: 830 },
    ],
  },
  cinnamon: {
    name: 'Cinnamon',
    basePrice: 3500.0,
    currency: 'LKR',
    unit: 'per kg',
    season: 'Year-round',
    demandLevel: 'High',
    volatility: 0.15,
    historicalPrices: [
      { month: 'January', price: 3300 },
      { month: 'February', price: 3400 },
      { month: 'March', price: 3550 },
      { month: 'April', price: 3600 },
      { month: 'May', price: 3450 },
      { month: 'June', price: 3350 },
    ],
  },
  coconut: {
    name: 'Coconut',
    basePrice: 120.0,
    currency: 'LKR',
    unit: 'per nut',
    season: 'Year-round',
    demandLevel: 'High',
    volatility: 0.10,
    historicalPrices: [
      { month: 'January', price: 110 },
      { month: 'February', price: 115 },
      { month: 'March', price: 125 },
      { month: 'April', price: 130 },
      { month: 'May', price: 120 },
      { month: 'June', price: 115 },
    ],
  },
  pepper: {
    name: 'Black Pepper',
    basePrice: 2800.0,
    currency: 'LKR',
    unit: 'per kg',
    season: 'December - March',
    demandLevel: 'Medium',
    volatility: 0.18,
    historicalPrices: [
      { month: 'January', price: 2650 },
      { month: 'February', price: 2750 },
      { month: 'March', price: 2900 },
      { month: 'April', price: 2850 },
      { month: 'May', price: 2700 },
      { month: 'June', price: 2600 },
    ],
  },
  rubber: {
    name: 'Rubber',
    basePrice: 450.0,
    currency: 'LKR',
    unit: 'per kg',
    season: 'Year-round',
    demandLevel: 'Medium',
    volatility: 0.14,
    historicalPrices: [
      { month: 'January', price: 420 },
      { month: 'February', price: 435 },
      { month: 'March', price: 455 },
      { month: 'April', price: 460 },
      { month: 'May', price: 445 },
      { month: 'June', price: 430 },
    ],
  },
  maize: {
    name: 'Maize',
    basePrice: 95.0,
    currency: 'LKR',
    unit: 'per kg',
    season: 'Yala',
    demandLevel: 'Medium',
    volatility: 0.09,
    historicalPrices: [
      { month: 'January', price: 88 },
      { month: 'February', price: 92 },
      { month: 'March', price: 97 },
      { month: 'April', price: 100 },
      { month: 'May', price: 94 },
      { month: 'June', price: 90 },
    ],
  },
  vegetables: {
    name: 'Mixed Vegetables',
    basePrice: 350.0,
    currency: 'LKR',
    unit: 'per kg',
    season: 'Year-round',
    demandLevel: 'Very High',
    volatility: 0.25,
    historicalPrices: [
      { month: 'January', price: 300 },
      { month: 'February', price: 320 },
      { month: 'March', price: 380 },
      { month: 'April', price: 400 },
      { month: 'May', price: 340 },
      { month: 'June', price: 310 },
    ],
  },
};

/**
 * Get crop data by name (case insensitive)
 * @param {string} cropName
 * @returns {Object|null}
 */
const getCropData = (cropName) => {
  const key = cropName.toLowerCase().replace(/\s+/g, '');
  return cropData[key] || null;
};

/**
 * Get all supported crops
 * @returns {Array}
 */
const getSupportedCrops = () => {
  return Object.keys(cropData).map((key) => ({
    key,
    name: cropData[key].name,
    basePrice: cropData[key].basePrice,
    currency: cropData[key].currency,
    unit: cropData[key].unit,
  }));
};

module.exports = {
  getCropData,
  getSupportedCrops,
};
