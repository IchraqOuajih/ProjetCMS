const express = require("express");
const router = express.Router();
const proController = require("./pro.controller");


router.post("/", proController.createPro);


router.get("/", proController.getAllPros);

router.get("/:id", proController.getProById);

module.exports = router;
