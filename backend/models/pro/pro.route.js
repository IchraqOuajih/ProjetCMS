const express = require("express");
const router = express.Router();
const proController = require("./pro.controller");

// 🔹 ROUTE DE TEST
router.get("/test", proController.test);

// 🔹 Créer un nouveau professionnel
router.post("/", proController.createPro);

// 🔹 Récupérer tous les professionnels
router.get("/", proController.getAllPros);

// 🔹 Récupérer un pro par son ID
router.get("/:id", proController.getProById);

// 🔹 Mettre à jour un pro
router.put("/:id", proController.updatePro);

// 🔹 Supprimer un pro
router.delete("/:id", proController.deletePro);

module.exports = router;
