const mongoose = require('mongoose');

// Service Schema
const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }, // Price for the service
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
