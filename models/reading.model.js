const mongoose = require('mongoose');
const { Schema } = mongoose;

const readSchema = new Schema({
  sensorId: {
    type: Schema.Types.ObjectId,
    ref: 'Sensor',
    required: [true, 'sensorId is required']

  },
  time: {
    type: Date,
    default: Date.now
  },
  value: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Reading', readSchema);
