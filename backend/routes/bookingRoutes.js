const express = require('express');
const router = express.Router();
const Booking = require('../models/booking'); // Assuming you have a Booking model

// Add a route to search bookings by phone number
router.get('/search/:phoneNumber', async (req, res) => {
  const { phoneNumber } = req.params;
  
  try {
    const bookings = await Booking.find({ phoneNumber: phoneNumber });
    if (bookings.length > 0) {
      res.status(200).json(bookings);
    } else {
      res.status(404).json({ message: "No bookings found for this phone number" });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving bookings', error: err.message });
  }
});

module.exports = router;
