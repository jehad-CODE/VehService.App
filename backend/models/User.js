const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Plaintext password
  role: { type: String, default: 'customer' }, // Default role is 'customer'
});

module.exports = mongoose.model('User', UserSchema);
