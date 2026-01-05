const express = require("express");
const router = express.Router();
const proController = require("./pro.controller");

// Créer un nouveau professionnel
router.post("/", proController.createPro);

// Récupérer un pro par son ID
router.get("/:id", proController.getProById);

module.exports = router;
