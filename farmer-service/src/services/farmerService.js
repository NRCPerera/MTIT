const FarmerModel = require('../models/farmerModel');

/**
 * Service layer for Farmer operations
 * Contains business logic separated from the controller
 */
class FarmerService {
  /**
   * Get all farmers from the data store
   * @returns {Object} - Success response with farmers array
   */
  static getAllFarmers() {
    const farmers = FarmerModel.getAllFarmers();
    return {
      success: true,
      count: farmers.length,
      data: farmers,
    };
  }

  /**
   * Get a single farmer by ID
   * @param {string} id - Farmer ID
   * @returns {Object} - Success/error response
   */
  static getFarmerById(id) {
    const farmer = FarmerModel.getFarmerById(id);
    if (!farmer) {
      return {
        success: false,
        error: `Farmer with ID '${id}' not found`,
      };
    }
    return {
      success: true,
      data: farmer,
    };
  }

  /**
   * Register a new farmer
   * @param {Object} data - Farmer registration data
   * @returns {Object} - Success/error response
   */
  static createFarmer(data) {
    // Validation
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

    if (errors.length > 0) {
      return {
        success: false,
        errors,
      };
    }

    const farmer = FarmerModel.createFarmer(data);
    return {
      success: true,
      message: 'Farmer registered successfully',
      data: farmer,
    };
  }
}

module.exports = FarmerService;
