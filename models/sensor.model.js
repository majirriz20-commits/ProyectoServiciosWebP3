const mongoose = require('mongoose');
const { Schema } = mongoose;

const sensorSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ['temperature', 'humidity', 'co2', 'noise'],
    trim: true
  },

  unit: {
    type: String,
    required: true,
    enum: ['°C', '%', 'ppm'],
  },

  model: {
    type: String,
    required: true,
    trim: true
  },

  location: {
    type: String,
    required: true
  },

  isActive: {
    type: Boolean,
    default: true
  },

  deviceId: {
    type: Schema.Types.ObjectId,
    ref: 'Device',
    required: true
  },

  installedAt: {
    type: Date,
    default: Date.now
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('Sensor', sensorSchema);
