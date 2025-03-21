const express = require('express');
const { signUp, signIn } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signUp);  // POST request for sign-up
router.post('/signin', signIn);  // POST request for sign-in

module.exports = router;
