const MarketplaceService = require('../services/marketplaceService');

/**
 * @desc    Get all products
 * @route   GET /products
 */
exports.getAllProducts = async (req, res) => {
  try {
    const result = await MarketplaceService.getAllProducts();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};

/**
 * @desc    Get a product by ID
 * @route   GET /products/:id
 */
exports.getProductById = async (req, res) => {
  try {
    const result = await MarketplaceService.getProductById(req.params.id);
    if (!result.success) {
      return res.status(404).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};

/**
 * @desc    Create a new product listing
 * @route   POST /products
 */
exports.createProduct = async (req, res) => {
  try {
    const result = await MarketplaceService.createProduct(req.body);
    if (!result.success) {
      return res.status(400).json(result);
    }
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};

/**
 * @desc    Update an existing product
 * @route   PUT /products/:id
 */
exports.updateProduct = async (req, res) => {
  try {
    const result = await MarketplaceService.updateProduct(req.params.id, req.body);
    if (!result.success) {
      if (result.errors) {
        return res.status(400).json(result);
      }
      return res.status(404).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};

/**
 * @desc    Delete a product
 * @route   DELETE /products/:id
 */
exports.deleteProduct = async (req, res) => {
  try {
    const result = await MarketplaceService.deleteProduct(req.params.id);
    if (!result.success) {
      return res.status(404).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};

/**
 * @desc    Get all orders
 * @route   GET /orders
 */
exports.getAllOrders = async (req, res) => {
  try {
    const result = await MarketplaceService.getAllOrders();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};

/**
 * @desc    Get an order by ID
 * @route   GET /orders/:id
 */
exports.getOrderById = async (req, res) => {
  try {
    const result = await MarketplaceService.getOrderById(req.params.id);
    if (!result.success) {
      return res.status(404).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};

/**
 * @desc    Place a new order
 * @route   POST /orders
 */
exports.createOrder = async (req, res) => {
  try {
    const result = await MarketplaceService.createOrder(req.body);
    if (!result.success) {
      return res.status(400).json(result);
    }
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};

/**
 * @desc    Update an existing order
 * @route   PUT /orders/:id
 */
exports.updateOrder = async (req, res) => {
  try {
    const result = await MarketplaceService.updateOrder(req.params.id, req.body);
    if (!result.success) {
      if (result.errors) {
        return res.status(400).json(result);
      }
      return res.status(404).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};

/**
 * @desc    Delete an order
 * @route   DELETE /orders/:id
 */
exports.deleteOrder = async (req, res) => {
  try {
    const result = await MarketplaceService.deleteOrder(req.params.id);
    if (!result.success) {
      return res.status(404).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};
