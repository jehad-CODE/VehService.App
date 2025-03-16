const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model
const router = express.Router();

// Admin Dashboard Route (protected)
router.get('/admin-dashboard', async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    if (!token) {
      return res.status(403).json({ message: 'No token provided, access denied' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by ID to check their role
    const user = await User.findById(decoded.id);

    // If the user is not an admin, deny access
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden, Admin access required' });
    }

    // Admin has access, send the dashboard data
    res.json({
      message: 'Welcome to the admin dashboard!',
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
