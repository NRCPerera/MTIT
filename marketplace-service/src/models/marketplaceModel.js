const mongoose = require('mongoose');

/**
 * Product Schema for MongoDB
 */
const productSchema = new mongoose.Schema({
  farmerId: {
    type: String,
    required: [true, 'Farmer ID is required']
  },
  cropName: {
    type: String,
    required: [true, 'Crop name is required'],
    trim: true
  },
  category: {
    type: String,
    default: 'General'
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative']
  },
  unit: {
    type: String,
    default: 'kg'
  },
  pricePerUnit: {
    type: Number,
    required: [true, 'Price per unit is required'],
    min: [0, 'Price cannot be negative']
  },
  currency: {
    type: String,
    default: 'LKR'
  },
  description: String,
  status: {
    type: String,
    enum: ['Available', 'Out of Stock', 'Sold'],
    default: 'Available'
  },
  harvestDate: Date
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

/**
 * Order Schema for MongoDB
 */
const orderSchema = new mongoose.Schema({
  buyerId: {
    type: String,
    required: [true, 'Buyer ID is required']
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product ID is required']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Minimum 1 quantity required']
  },
  totalPrice: Number,
  currency: String,
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  orderDate: { type: Date, default: Date.now },
  deliveryAddress: String
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);

module.exports = { Product, Order };
