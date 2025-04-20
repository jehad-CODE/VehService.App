const express = require("express");
const router = express.Router();
const AdminRequest = require("../models/AdminRequest");

// Get all admin requests
router.get("/", async (req, res) => {
  const requests = await AdminRequest.find();
  res.json(requests);
});

// Create new admin request
router.post("/", async (req, res) => {
  const { username, email } = req.body;
  const newRequest = new AdminRequest({ username, email });
  await newRequest.save();
  res.status(201).json(newRequest);
});

// Delete admin request
router.delete("/:id", async (req, res) => {
  await AdminRequest.findByIdAndDelete(req.params.id);
  res.json({ message: "Admin deleted" });
});

// Update admin request
router.put("/:id", async (req, res) => {
  const { username, email } = req.body;
  const updated = await AdminRequest.findByIdAndUpdate(
    req.params.id,
    { username, email },
    { new: true }
  );
  res.json(updated);
});

module.exports = router;
