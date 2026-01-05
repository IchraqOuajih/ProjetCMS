const express = require("express");
const router = express.Router();
const { register, login } = require("./user.controller");
const User = require("./user.model");


router.post("/register", register);


router.post("/login", login);


router.get("/", async (req, res) => {
    try {
        const users = await User.find({}, "-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
