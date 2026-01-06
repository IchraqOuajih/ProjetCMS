// login.controller.js
const User = require("./login.model"); // le modèle User
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Fonction pour gérer le login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Email ou mot de passe incorrect." });

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Email ou mot de passe incorrect." });

        // Générer un token (optionnel)
        const token = jwt.sign({ id: user._id, type: user.type }, "SECRET_KEY", { expiresIn: "1d" });

        // Répondre avec les infos de l'utilisateur et le token
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
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

module.exports = { loginUser };
