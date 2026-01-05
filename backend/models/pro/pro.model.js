// backend/models/pro/pro.model.js
const mongoose = require("mongoose");

const proSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashé avec bcrypt
  location: { type: String, required: true },
  service: { type: String, required: true },
  specialty: { type: String },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Pro", proSchema);
