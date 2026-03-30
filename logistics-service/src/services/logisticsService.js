const Delivery = require('../models/logisticsModel');

/**
 * Service layer for Logistics operations with MongoDB
 */
class LogisticsService {
  /**
   * Get all deliveries
   * @returns {Promise<Object>}
   */
  static async getAllDeliveries() {
    const deliveries = await Delivery.find();
    return {
      success: true,
      count: deliveries.length,
      data: deliveries,
    };
  }

  /**
   * Get a delivery by ID with tracking details
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async getDeliveryById(id) {
    const delivery = await Delivery.findById(id);
    if (!delivery) {
      return {
        success: false,
        error: `Delivery with ID '${id}' not found`,
      };
    }
    return {
      success: true,
      data: delivery,
    };
  }

  /**
   * Create a new delivery
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  static async createDelivery(data) {
    try {
      const deliveryData = {
        ...data,
        trackingHistory: [{
          status: 'Created',
          location: data.pickupAddress,
          notes: 'Delivery order created'
        }]
      };
      
      const delivery = await Delivery.create(deliveryData);
      return {
        success: true,
        message: 'Delivery created successfully',
        data: delivery,
      };
    } catch (error) {
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

module.exports = LogisticsService;
