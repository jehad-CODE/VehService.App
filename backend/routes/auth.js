// backend/routes/auth.js
const express = require('express');
const { signIn, signUp } = require('../controllers/authController');

const router = express.Router();

// Sign-In route
router.post('/sign-in', signIn);

// Sign-Up route
router.post('/sign-up', signUp);

module.exports = router;