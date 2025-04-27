const express = require("express");
const router = express.Router();
const AdminRequest = require("../models/AdminRequest");
const User = require("../models/User");

// Get all admin requests, regardless of status
router.get("/", async (req, res) => {
  try {
    const requests = await AdminRequest.find(); // Fetch all requests
    res.json(requests);
  } catch (error) {
    console.error("Error fetching admin requests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create new admin request
router.post("/", async (req, res) => {
  const { username, email } = req.body;
  const newRequest = new AdminRequest({ username, email, status: "pending" });
  await newRequest.save();
  res.status(201).json(newRequest);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { status, role } = req.body; 

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const request = await AdminRequest.findById(id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = status;
    if (status === "approved" && role) {
      request.role = role; 
    }
    await request.save();

    if (status === "approved") {
      const newUser = new User({
        username: request.username,
        email: request.email,
        role: request.role, 
      });
      await newUser.save();
    }

    res.json(request); 
  } catch (error) {
    console.error("Error updating admin request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete admin request
router.delete("/:id", async (req, res) => {
  try {
    const request = await AdminRequest.findByIdAndDelete(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.status(200).json({ message: "Request deleted" });
  } catch (error) {
    console.error("Error deleting admin request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
