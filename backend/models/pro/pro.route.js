const express = require("express");
const router = express.Router();
const proController = require("./pro.controller");

// 🔹 ROUTE DE TEST (TRÈS IMPORTANTE)
router.get("/test", proController.test);

// Créer un nouveau professionnel
router.post("/", proController.createPro);

// Récupérer tous les professionnels
router.get("/", proController.getAllPros);

// Récupérer un pro par son ID
router.get("/:id", proController.getProById);

module.exports = router;
