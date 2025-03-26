const Booking = require('../models/booking'); // Import the Booking model

// Controller to create a booking
async function createBooking(req, res) {
  try {
    // Destructure booking details from the request body
    const { customer, email, phoneNumber, car, date, time, bookingType, note, branch } = req.body;

    // Create a new booking instance with the data
    const newBooking = new Booking({
      customer,
      email,
      phoneNumber,
      car,
      date,
      time,
      bookingType,
      note,
      branch,
    });

    // Save the booking to the database
    await newBooking.save();

    // Send response to the client
    res.status(201).json({
      message: 'Booking successful',
      booking: newBooking,
    });
  } catch (error) {
    // Handle errors and send a failure response
    res.status(500).json({
      message: 'Failed to create booking',
      error: error.message,
    });
  }
}

module.exports = {
  createBooking,
};
