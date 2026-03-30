const Buyer = require('../models/buyerModel');

/**
 * Service layer for Buyer operations with MongoDB
 */
class BuyerService {
  /**
   * Get all buyers
   * @returns {Promise<Object>}
   */
  static async getAllBuyers() {
    const buyers = await Buyer.find();
    return {
      success: true,
      count: buyers.length,
      data: buyers,
    };
  }

  /**
   * Get a buyer by ID
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async getBuyerById(id) {
    const buyer = await Buyer.findById(id);
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
   * @returns {Promise<Object>}
   */
  static async createBuyer(data) {
    try {
      const buyer = await Buyer.create(data);
      return {
        success: true,
        message: 'Buyer registered successfully',
        data: buyer,
      };
    } catch (error) {
      if (error.code === 11000) {
        return {
          success: false,
          errors: ['Email already exists']
        };
      }
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(val => val.message);
        return {
          success: false,
          errors: messages
        };
      }
      throw error;
    }
  }
}

module.exports = BuyerService;
