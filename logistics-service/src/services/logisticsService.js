const LogisticsModel = require('../models/logisticsModel');

/**
 * Service layer for Logistics operations
 */
class LogisticsService {
  /**
   * Get all deliveries
   * @returns {Object}
   */
  static getAllDeliveries() {
    const deliveries = LogisticsModel.getAllDeliveries();
    return {
      success: true,
      count: deliveries.length,
      data: deliveries,
    };
  }

  /**
   * Get a delivery by ID with tracking details
   * @param {string} id
   * @returns {Object}
   */
  static getDeliveryById(id) {
    const delivery = LogisticsModel.getDeliveryById(id);
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
   * @returns {Object}
   */
  static createDelivery(data) {
    const errors = [];
    if (!data.orderId) errors.push('orderId is required');
    if (!data.pickupAddress || data.pickupAddress.trim().length === 0) {
      errors.push('pickupAddress is required');
    }
    if (!data.deliveryAddress || data.deliveryAddress.trim().length === 0) {
      errors.push('deliveryAddress is required');
    }

    if (errors.length > 0) {
      return { success: false, errors };
    }

    const delivery = LogisticsModel.createDelivery(data);
    return {
      success: true,
      message: 'Delivery created successfully',
      data: delivery,
    };
  }
}

module.exports = LogisticsService;
