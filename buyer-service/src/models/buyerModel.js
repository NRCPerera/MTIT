const mongoose = require('mongoose');

/**
 * Buyer Schema for MongoDB
 */
const buyerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format']
  },
  phone: {
    type: String,
    trim: true,
    default: null
  },
  company: {
    type: String,
    trim: true,
    default: null
  },
  buyerType: {
    type: String,
    enum: ['Wholesale', 'Retail', 'Export'],
    default: 'Retail'
  },
  preferredCrops: {
    type: [String],
    default: []
  }
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

const Buyer = mongoose.model('Buyer', buyerSchema);

module.exports = Buyer;
