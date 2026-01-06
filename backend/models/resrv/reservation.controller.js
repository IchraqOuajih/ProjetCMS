const Reservation = require("./reservation.model");

exports.createReservation = async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();

    res.status(201).json({
      message: "Rendez-vous réservé avec succès ✅",
      reservation
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.getReservationsByPro = async (req, res) => {
  try {
    const reservations = await Reservation.find({ proId: req.params.id });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
