const express = require("express");
const router = express.Router();
const controller = require("./reservation.controller");

router.post("/", controller.createReservation);
router.get("/pro/:id", controller.getReservationsByPro);
//router.put("/:id", controller.updateReservation);

module.exports = router;
