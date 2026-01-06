// login.route.js
const express = require("express");
const router = express.Router();
const { loginUser } = require("./login.controller");

// Route POST pour le login
router.post("/", loginUser);

module.exports = router;
