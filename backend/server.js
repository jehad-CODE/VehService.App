const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User'); // User model for registration and login
const Booking = require('./models/booking'); // Import Booking model
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/vehicle-service', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Route for user registration (sign-up)
app.post('/api/auth/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route for user login (sign-in)
app.post('/api/auth/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route for booking an appointment
app.post('/api/booking', async (req, res) => {
  const { customer, phoneNumber, car, date, time, bookingType, note, branch } = req.body;

  try {
    // Create a new booking
    const newBooking = new Booking({
      customer,
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

    res.status(201).json({ message: 'Booking successful', booking: newBooking });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
