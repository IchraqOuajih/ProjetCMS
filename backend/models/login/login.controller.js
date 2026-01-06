// login.controller.js
const User = require("../user/user.model"); // <-- modèle unique
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Email ou mot de passe incorrect." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Email ou mot de passe incorrect." });

        const token = jwt.sign({ id: user._id, type: user.type }, "SECRET_KEY", { expiresIn: "1d" });

        res.json({
            message: "Login successful",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                type: user.type
            },
            token
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

module.exports = { loginUser };
