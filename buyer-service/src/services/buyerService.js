const BuyerModel = require('../models/buyerModel');

/**
 * Service layer for Buyer operations
 */
class BuyerService {
  /**
   * Get all buyers
   * @returns {Object}
   */
  static getAllBuyers() {
    const buyers = BuyerModel.getAllBuyers();
    return {
      success: true,
      count: buyers.length,
      data: buyers,
    };
  }

  /**
   * Get a buyer by ID
   * @param {string} id
   * @returns {Object}
   */
  static getBuyerById(id) {
    const buyer = BuyerModel.getBuyerById(id);
    if (!buyer) {
      return {
        success: false,
        error: `Buyer with ID '${id}' not found`,
      };
    }
    return {
      success: true,
      data: buyer,
    };
  }

  /**
   * Register a new buyer
   * @param {Object} data
   * @returns {Object}
   */
  static createBuyer(data) {
    const errors = [];
    if (!data.name || data.name.trim().length === 0) {
      errors.push('Name is required');
    }
    if (!data.email || data.email.trim().length === 0) {
      errors.push('Email is required');
    }
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push('Invalid email format');
    }
    if (data.buyerType && !['Wholesale', 'Retail', 'Export'].includes(data.buyerType)) {
      errors.push('buyerType must be one of: Wholesale, Retail, Export');
    }

    if (errors.length > 0) {
      return { success: false, errors };
    }

    const buyer = BuyerModel.createBuyer(data);
    return {
      success: true,
      message: 'Buyer registered successfully',
      data: buyer,
    };
  }
}

module.exports = BuyerService;
