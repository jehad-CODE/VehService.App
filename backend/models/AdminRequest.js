const mongoose = require("mongoose");

const adminRequestSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["pending", "admina", "adminb", "adminc"], 
    default: "pending", 
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending", // Default status
  },
});

module.exports = mongoose.model("AdminRequest", adminRequestSchema);
