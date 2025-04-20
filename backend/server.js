const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const User = require("./models/User");
const Booking = require("./models/booking");
const AdminRequest = require("./models/AdminRequest");

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
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// ------------------- Regular User Signup -------------------
app.post("/api/auth/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered", user: newUser });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ------------------- Regular User Signin -------------------
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
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ------------------- Admin Signup Request -------------------
app.post("/api/admin/request", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingRequest = await AdminRequest.findOne({ email });
    if (existingRequest) {
      return res.status(400).json({ message: "Request already exists" });
    }

    const newRequest = new AdminRequest({ username, email, password });
    await newRequest.save();

    res.status(201).json({ message: "Admin signup request submitted" });
  } catch (error) {
    console.error("Admin request error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ------------------- Super Admin: View All Requests -------------------
app.get("/api/superadmin/requests", async (req, res) => {
  try {
    const requests = await AdminRequest.find({ status: "pending" });
    res.status(200).json(requests);
  } catch (error) {
    console.error("Fetching admin requests failed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ------------------- Super Admin: Approve or Reject Request -------------------
app.put("/api/superadmin/requests/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const request = await AdminRequest.findById(id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = status;
    await request.save();

    if (status === "approved") {
      // Create user account for approved admin
      const newAdmin = new User({
        username: request.username,
        email: request.email,
        password: request.password,
        role: "admin",
      });
      await newAdmin.save();
    }

    res.status(200).json({ message: `Request ${status}`, request });
  } catch (error) {
    console.error("Updating request failed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ------------------- Booking Routes -------------------
app.post("/api/booking", async (req, res) => {
  const { customer, email, phoneNumber, car, date, time, bookingType, note, branch } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required." });

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

    res.status(201).json({ message: "Booking successful", booking: newBooking });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/booking/search/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const bookings = await Booking.find({ email });

    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found." });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Booking search error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Admin GET, EDIT, DELETE
app.get("/api/admin/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Get bookings error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/api/admin/edit/bookings/:email", async (req, res) => {
  const { email } = req.params;
  const update = req.body;

  try {
    const updatedBooking = await Booking.findOneAndUpdate({ email }, update, { new: true });
    if (!updatedBooking) return res.status(404).json({ message: "Booking not found." });

    res.status(200).json({ message: "Booking updated", booking: updatedBooking });
  } catch (error) {
    console.error("Edit booking error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/api/admin/delete/bookings/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const deletedBooking = await Booking.findOneAndDelete({ email });
    if (!deletedBooking) return res.status(404).json({ message: "Booking not found." });

    res.status(200).json({ message: "Booking deleted", booking: deletedBooking });
  } catch (error) {
    console.error("Delete booking error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start server
const port = 5000;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
