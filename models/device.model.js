const mongoose = require('mongoose');
const { Schema } = mongoose;

const deviceSchema = new Schema({
  serialNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  model: {
    type: String,
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  zoneId: {
    type: Schema.Types.ObjectId,
    ref: 'Zone',
    required: true
  },
  installedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'maintenance', 'offline'],
    default: 'active'
  },
  sensors: [{
    type: Schema.Types.ObjectId,
    ref: 'Sensor'
  }]
});

module.exports = mongoose.model('Device', deviceSchema);
