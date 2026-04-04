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
   * Get a single farmer by farmerId
   * @param {string} farmerId
   * @returns {Promise<Object>}
   */
  static async getFarmerById(farmerId) {
    const farmer = await Farmer.findOne({ farmerId });
    if (!farmer) {
      return {
        success: false,
        error: `Farmer with ID '${farmerId}' not found`,
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
   * Update an existing farmer by farmerId
   * @param {string} farmerId
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  static async updateFarmer(farmerId, data) {
    try {
      const farmer = await Farmer.findOneAndUpdate({ farmerId }, data, {
        new: true,
        runValidators: true,
      });
      if (!farmer) {
        return {
          success: false,
          error: `Farmer with ID '${farmerId}' not found`,
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
   * Delete a farmer by farmerId
   * @param {string} farmerId
   * @returns {Promise<Object>}
   */
  static async deleteFarmer(farmerId) {
    const farmer = await Farmer.findOneAndDelete({ farmerId });
    if (!farmer) {
      return {
        success: false,
        error: `Farmer with ID '${farmerId}' not found`,
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

