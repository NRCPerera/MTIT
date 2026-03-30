const mongoose = require('mongoose');

/**
 * Historical Price Schema
 */
const historicalPriceSchema = new mongoose.Schema({
  month: String,
  price: Number
}, { _id: false });

/**
 * Crop Data Schema for MongoDB
 */
const cropSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true
  },
  basePrice: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'LKR'
  },
  unit: {
    type: String,
    default: 'per kg'
  },
  season: String,
  demandLevel: String,
  volatility: Number,
  historicalPrices: [historicalPriceSchema]
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

const Crop = mongoose.model('Crop', cropSchema);

module.exports = Crop;
