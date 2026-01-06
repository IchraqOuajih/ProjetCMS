const express = require("express");
const router = express.Router();
const controller = require("./reservation.controller");

router.post("/", controller.createReservation);
router.get("/pro/:id", controller.getReservationsByPro);

module.exports = router;
