const mongoose = require('mongoose');

// Define the schema for booking
const bookingSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  car: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  bookingType: { type: String, required: true },
  note: { type: String, required: false },
  branch: { type: String, required: false },
  status: { type: String, default: 'pending' }, // Ensure this is set correctly
});

// Create the model from the schema
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
