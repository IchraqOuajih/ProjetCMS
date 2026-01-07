const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // ou Pro si pas de user encore
    required: false
  },

  proId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pro",
    required: true
  },

  date: {
    type: String,
    required: true
  },

  time: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["en_attente", "confirmé", "annulé"],
    default: "en_attente"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Reservation", reservationSchema);
