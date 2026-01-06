const express = require("express");
const router = express.Router();
const { loginUser } = require("./login.controller");

// POST /api/login
router.post("/", loginUser);

module.exports = router;
