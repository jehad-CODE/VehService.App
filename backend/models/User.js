const mongoose = require('mongoose');

// Define the User Schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'customer', // Default to 'customer' role
    enum: ['customer', 'admin'], // Only 'customer' or 'admin' roles allowed
  },
});

// Export the model
module.exports = mongoose.model('User', UserSchema);
