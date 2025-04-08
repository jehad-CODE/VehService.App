const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User"); // User model for registration and login
const Booking = require("./models/booking"); // Import Booking model

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/vehicle-service", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

/* ----------------------------- SIGN UP ROUTE ----------------------------- */
app.post("/api/auth/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* ----------------------------- SIGN IN ROUTE ----------------------------- */
app.post("/api/auth/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role, // Include the role in the login response
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


/* ----------------------------- BOOKING ROUTE ----------------------------- */
app.post("/api/booking", async (req, res) => {
  const { customer, email, phoneNumber, car, date, time, bookingType, note, branch } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const newBooking = new Booking({
      customer,
      email,
      phoneNumber,
      car,
      date,
      time,
      bookingType,
      note,
      branch,
    });

    await newBooking.save();

    res.status(201).json({
      message: "Booking successful",
      booking: newBooking, // The status should appear in the response here
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//* ---------------------- SEARCH BOOKING BY USER EMAIL ---------------------- */
app.get("/api/booking/search/:email", async (req, res) => {
  const { email } = req.params;

  try {
    // Search bookings by email, not phone number
    const bookings = await Booking.find({ email });

    if (bookings.length > 0) {
      return res.status(200).json(bookings);
    } else {
      return res.status(404).json({ message: "No service history found for this email." });
    }
  } catch (error) {
    console.error("Error fetching service history:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


//* ---------------------- Admin get ---------------------- */
app.get("/api/admin/bookings", async (req, res) => {
  try {
   
    const bookings = await Booking.find(); // Fetch all bookings from the database
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Edit booking by email
app.put("/api/admin/edit/bookings/:email", async (req, res) => {
  const { email } = req.params; // Extract the email from the URL
  const { customer, phoneNumber, car, date, time, bookingType, note, branch, status } = req.body; // Get the updated data from the request body

  try {
    // Find the booking by the user's email
    const updatedBooking = await Booking.findOneAndUpdate(
      { email }, // Match by email
      { customer, phoneNumber, car, date, time, bookingType, note, branch, status }, // Updated data
      { new: true } // Return the updated booking
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found for this email." });
    }

    res.status(200).json({ message: "Booking updated successfully", booking: updatedBooking });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete booking by email
app.delete("/api/admin/delete/bookings/:email", async (req, res) => {
  const { email } = req.params; // Extract the email from the URL

  try {
    // Find and delete the booking by the user's email
    const deletedBooking = await Booking.findOneAndDelete({ email });

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found for this email." });
    }

    res.status(200).json({ message: "Booking deleted successfully", booking: deletedBooking });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


/* ----------------------------- START SERVER ----------------------------- */
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

  
