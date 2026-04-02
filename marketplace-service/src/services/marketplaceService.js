const { Product, Order } = require('../models/marketplaceModel');

/**
 * Service layer for Marketplace operations with MongoDB
 */
class MarketplaceService {
  // ─── Product Operations ──────────────────────────────────
  static async getAllProducts() {
    const products = await Product.find();
    return {
      success: true,
      count: products.length,
      data: products,
    };
  }

  static async getProductById(id) {
    try {
      const product = await Product.findById(id);
      if (!product) {
        return { success: false, error: `Product with ID '${id}' not found` };
      }
      return { success: true, data: product };
    } catch (err) {
      return { success: false, error: `Invalid ID format` };
    }
  }

  static async createProduct(data) {
    try {
      const product = await Product.create(data);
      return {
        success: true,
        message: 'Product listing created successfully',
        data: product,
      };
    } catch (error) {
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(val => val.message);
        return { success: false, errors: messages };
      }
      throw error;
    }
  }

  /**
   * Update an existing product by ID
   * @param {string} id
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  static async updateProduct(id, data) {
    try {
      const product = await Product.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
      if (!product) {
        return { success: false, error: `Product with ID '${id}' not found` };
      }
      return {
        success: true,
        message: 'Product updated successfully',
        data: product,
      };
    } catch (error) {
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(val => val.message);
        return { success: false, errors: messages };
      }
      throw error;
    }
  }

  /**
   * Delete a product by ID
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async deleteProduct(id) {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return { success: false, error: `Product with ID '${id}' not found` };
    }
    return {
      success: true,
      message: 'Product deleted successfully',
      data: product,
    };
  }

  // ─── Order Operations ────────────────────────────────────
  static async getAllOrders() {
    const orders = await Order.find().populate('productId');
    return {
      success: true,
      count: orders.length,
      data: orders,
    };
  }

  /**
   * Get an order by ID
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async getOrderById(id) {
    try {
      const order = await Order.findById(id).populate('productId');
      if (!order) {
        return { success: false, error: `Order with ID '${id}' not found` };
      }
      return { success: true, data: order };
    } catch (err) {
      return { success: false, error: `Invalid ID format` };
    }
  }

  static async createOrder(data) {
    try {
      // Check if product exists and has sufficient quantity
      const product = await Product.findById(data.productId);
      if (!product) {
        return { success: false, error: `Product with ID '${data.productId}' not found` };
      }
      
      if (product.quantity < data.quantity) {
        return { success: false, error: `Insufficient stock. Available: ${product.quantity} ${product.unit}` };
      }

      const orderData = {
        ...data,
        totalPrice: product.pricePerUnit * data.quantity,
        currency: product.currency
      };
      
      const order = await Order.create(orderData);
      
      // Update product quantity (basic atomic approach not implemented for brevity)
      product.quantity -= data.quantity;
      await product.save();

      return {
        success: true,
        message: 'Order placed successfully',
        data: order,
      };
    } catch (error) {
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(val => val.message);
        return { success: false, errors: messages };
      }
      throw error;
    }
  }

  /**
   * Update an existing order by ID
   * @param {string} id
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  static async updateOrder(id, data) {
    try {
      const order = await Order.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
      if (!order) {
        return { success: false, error: `Order with ID '${id}' not found` };
      }
      return {
        success: true,
        message: 'Order updated successfully',
        data: order,
      };
    } catch (error) {
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(val => val.message);
        return { success: false, errors: messages };
      }
      throw error;
    }
  }

  /**
   * Delete an order by ID
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async deleteOrder(id) {
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return { success: false, error: `Order with ID '${id}' not found` };
    }
    return {
      success: true,
      message: 'Order deleted successfully',
      data: order,
    };
  }
}

module.exports = MarketplaceService;
