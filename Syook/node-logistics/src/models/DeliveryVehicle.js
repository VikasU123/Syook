const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  vehicleType: {
    type: String,
    enum: ['bike', 'truck'],
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  activeOrdersCount: {
    type: Number,
    default: 0,
    max: 2,
  },
});

const DeliveryVehicle = mongoose.model('DeliveryVehicle', vehicleSchema);

module.exports = DeliveryVehicle;
