const mongoose = require("mongoose");

const proSchema = new mongoose.Schema({
  firstName: { type: String },  // enlever `required: true`
  lastName: { type: String },
  email: { type: String, unique: true }, // tu peux laisser unique pour éviter les doublons
  password: { type: String },
  location: { type: String },
  service: { type: String },
  specialty: { type: String },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Pro", proSchema);
