// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Sign-up controller
const signUp = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const newUser = new User({
      username,
      email,
      password,  // Store password as plain text
      role: role || 'customer',  // Default role is 'customer'
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Sign-up error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Sign-in controller
const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Password comparison (plain text)
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, role: user.role });
  } catch (error) {
    console.error('Sign-in error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { signUp, signIn };
