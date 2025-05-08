const mongoose = require('mongoose');

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
  status: { type: String, default: 'pending' },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
