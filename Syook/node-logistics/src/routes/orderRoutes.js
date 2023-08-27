const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const DeliveryVehicle = require('../models/DeliveryVehicle');

// Create an order
router.post('/', async (req, res) => {
  try {
    const { itemId, customerId } = req.body;

    // Check delivery vehicle availability and assign if possible
    const matchingVehicle = await DeliveryVehicle.findOne({
      city: req.body.deliveryCity,
      activeOrdersCount: { $lt: 2 },
    });

    if (!matchingVehicle) {
      return res.status(400).json({ message: 'No available delivery vehicle' });
    }

    // Create the order
    const newOrder = new Order({
      itemId,
      price: req.body.price,
      customerId,
      deliveryVehicleId: matchingVehicle._id,
    });

    // Increment the activeOrdersCount of the assigned vehicle
    matchingVehicle.activeOrdersCount += 1;
    await matchingVehicle.save();

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
