const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

router.post('/book', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: 'Booking successfully created!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
