const express = require('express');
const router = express.Router();
const DeliveryVehicle = require('../models/DeliveryVehicle');

// Create a delivery vehicle
router.post('/', async (req, res) => {
  try {
    const newVehicle = new DeliveryVehicle({
      registrationNumber: req.body.registrationNumber,
      vehicleType: req.body.vehicleType,
      city: req.body.city,
    });
    const savedVehicle = await newVehicle.save();
    res.status(201).json(savedVehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all delivery vehicles
router.get('/', async (req, res) => {
  try {
    const vehicles = await DeliveryVehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
