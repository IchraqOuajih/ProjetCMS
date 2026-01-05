const User = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Enregistrement
exports.register = async (req, res) => {
    try {
        // Hash le mot de passe avant de créer l'utilisateur
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({ ...req.body, password: hashedPassword });
        res.status(201).json({
            message: "User registered successfully",
            user: { ...user.toObject(), password: undefined } // on n'envoie pas le mot de passe
        });
    } catch (error) {
        res.status(400).json({
            message: "Error registering user",
            error: error.message
        });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Utilisateur non trouvé" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Mot de passe incorrect" });
        }

        // Génération d'un token JWT
        const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1h" });

        res.status(200).json({
            message: "Connexion réussie",
            user: { ...user.toObject(), password: undefined },
            token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
