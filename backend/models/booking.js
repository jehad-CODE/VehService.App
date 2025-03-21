const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  car: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  bookingType: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  branch: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed'],
    default: 'pending',
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
