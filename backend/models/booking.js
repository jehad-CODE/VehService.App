const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customer: String,
  phoneNumber: String,
  car: String,
  date: Date,
  time: String,
  bookingType: String,
  note: String,
  branch: String,
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
