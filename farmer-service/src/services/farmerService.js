const Farmer = require('../models/farmerModel');

/**
 * Service layer for Farmer operations with MongoDB
 */
class FarmerService {
  /**
   * Get all farmers from MongoDB
   * @returns {Promise<Object>}
   */
  static async getAllFarmers() {
    const farmers = await Farmer.find();
    return {
      success: true,
      count: farmers.length,
      data: farmers,
    };
  }

  /**
   * Get a single farmer by ID
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async getFarmerById(id) {
    const farmer = await Farmer.findById(id);
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
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  static async createFarmer(data) {
    try {
      const farmer = await Farmer.create(data);
      return {
        success: true,
        message: 'Farmer registered successfully',
        data: farmer,
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

  /**
   * Update an existing farmer by ID
   * @param {string} id
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  static async updateFarmer(id, data) {
    try {
      const farmer = await Farmer.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
      if (!farmer) {
        return {
          success: false,
          error: `Farmer with ID '${id}' not found`,
        };
      }
      return {
        success: true,
        message: 'Farmer updated successfully',
        data: farmer,
      };
    } catch (error) {
      if (error.code === 11000) {
        return {
          success: false,
          errors: ['Email already exists'],
        };
      }
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
   * Delete a farmer by ID
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async deleteFarmer(id) {
    const farmer = await Farmer.findByIdAndDelete(id);
    if (!farmer) {
      return {
        success: false,
        error: `Farmer with ID '${id}' not found`,
      };
    }
    return {
      success: true,
      message: 'Farmer deleted successfully',
      data: farmer,
    };
  }
}

module.exports = FarmerService;
