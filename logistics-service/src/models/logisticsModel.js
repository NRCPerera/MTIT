const mongoose = require('mongoose');

/**
 * Delivery Schema for MongoDB
 */
const trackingSchema = new mongoose.Schema({
  status: String,
  location: String,
  timestamp: { type: Date, default: Date.now },
  notes: String
}, { _id: false });

const deliverySchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: [true, 'Order ID is required']
  },
  farmerId: String,
  buyerId: String,
  pickupAddress: {
    type: String,
    required: [true, 'Pickup address is required']
  },
  deliveryAddress: {
    type: String,
    required: [true, 'Delivery address is required']
  },
  status: {
    type: String,
    enum: ['Pending Pickup', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Pending Pickup'
  },
  estimatedDeliveryDate: Date,
  actualDeliveryDate: Date,
  driverName: {
    type: String,
    default: 'To be assigned'
  },
  driverPhone: String,
  vehicleNumber: String,
  trackingHistory: [trackingSchema]
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

const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;
