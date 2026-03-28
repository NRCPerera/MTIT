const MarketplaceModel = require('../models/marketplaceModel');

/**
 * Service layer for Marketplace operations
 */
class MarketplaceService {
  // ─── Product Operations ──────────────────────────────────
  static getAllProducts() {
    const products = MarketplaceModel.getAllProducts();
    return {
      success: true,
      count: products.length,
      data: products,
    };
  }

  static getProductById(id) {
    const product = MarketplaceModel.getProductById(id);
    if (!product) {
      return { success: false, error: `Product with ID '${id}' not found` };
    }
    return { success: true, data: product };
  }

  static createProduct(data) {
    const errors = [];
    if (!data.farmerId) errors.push('farmerId is required');
    if (!data.cropName || data.cropName.trim().length === 0) errors.push('cropName is required');
    if (!data.quantity || data.quantity <= 0) errors.push('quantity must be a positive number');
    if (!data.pricePerUnit || data.pricePerUnit <= 0) errors.push('pricePerUnit must be a positive number');

    if (errors.length > 0) {
      return { success: false, errors };
    }

    const product = MarketplaceModel.createProduct(data);
    return {
      success: true,
      message: 'Product listing created successfully',
      data: product,
    };
  }

  // ─── Order Operations ────────────────────────────────────
  static getAllOrders() {
    const orders = MarketplaceModel.getAllOrders();
    return {
      success: true,
      count: orders.length,
      data: orders,
    };
  }

  static createOrder(data) {
    const errors = [];
    if (!data.buyerId) errors.push('buyerId is required');
    if (!data.productId) errors.push('productId is required');
    if (!data.quantity || data.quantity <= 0) errors.push('quantity must be a positive number');

    // Check if product exists
    if (data.productId) {
      const product = MarketplaceModel.getProductById(data.productId);
      if (!product) {
        errors.push(`Product with ID '${data.productId}' not found`);
      } else if (product.quantity < data.quantity) {
        errors.push(`Insufficient stock. Available: ${product.quantity} ${product.unit}`);
      }
    }

    if (errors.length > 0) {
      return { success: false, errors };
    }

    const order = MarketplaceModel.createOrder(data);
    return {
      success: true,
      message: 'Order placed successfully',
      data: order,
    };
  }
}

module.exports = MarketplaceService;
