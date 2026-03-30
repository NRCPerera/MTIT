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

  // ─── Order Operations ────────────────────────────────────
  static async getAllOrders() {
    const orders = await Order.find().populate('productId');
    return {
      success: true,
      count: orders.length,
      data: orders,
    };
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
}

module.exports = MarketplaceService;
