const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Create an item
router.post('/', async (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.name,
      price: req.body.price,
    });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
