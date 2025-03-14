// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:8081', // Allow requests from this origin
  credentials: true, // Allow cookies and credentials
}));

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));