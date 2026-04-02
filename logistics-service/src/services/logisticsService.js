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

  /**
   * Update an existing delivery by ID
   * Appends to tracking history when status changes
   * @param {string} id
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  static async updateDelivery(id, data) {
    try {
      const delivery = await Delivery.findById(id);
      if (!delivery) {
        return {
          success: false,
          error: `Delivery with ID '${id}' not found`,
        };
      }

      // If status is being updated, add a tracking history entry
      if (data.status && data.status !== delivery.status) {
        const trackingEntry = {
          status: data.status,
          location: data.currentLocation || delivery.deliveryAddress,
          notes: data.trackingNotes || `Status updated to ${data.status}`,
        };
        delivery.trackingHistory.push(trackingEntry);

        // If delivered, set actual delivery date
        if (data.status === 'Delivered') {
          delivery.actualDeliveryDate = new Date();
        }
      }

      // Update fields (excluding tracking-specific fields)
      const { currentLocation, trackingNotes, ...updateFields } = data;
      Object.keys(updateFields).forEach(key => {
        delivery[key] = updateFields[key];
      });

      await delivery.save();

      return {
        success: true,
        message: 'Delivery updated successfully',
        data: delivery,
      };
    } catch (error) {
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(val => val.message);
        return {
          success: false,
          errors: messages,
        };
      }
      throw error;
    }
  }

  /**
   * Delete a delivery by ID
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async deleteDelivery(id) {
    const delivery = await Delivery.findByIdAndDelete(id);
    if (!delivery) {
      return {
        success: false,
        error: `Delivery with ID '${id}' not found`,
      };
    }
    return {
      success: true,
      message: 'Delivery deleted successfully',
      data: delivery,
    };
  }
}

module.exports = LogisticsService;
