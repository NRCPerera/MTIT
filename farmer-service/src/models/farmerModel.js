const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

/**
 * Farmer Schema for MongoDB
 */
const farmerSchema = new mongoose.Schema({
  farmerId: {
    type: String,
    unique: true,
    default: uuidv4,
    index: true
  },
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
  location: {
    type: String,
    trim: true,
    default: null
  },
  crops: {
    type: [String],
    default: []
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

const Farmer = mongoose.model('Farmer', farmerSchema);

module.exports = Farmer;
