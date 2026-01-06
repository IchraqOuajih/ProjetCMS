const User = require("../models/user.model"); // ton modèle user
const bcrypt = require("bcryptjs"); // pour vérifier le mot de passe hashé
const jwt = require("jsonwebtoken"); // pour créer un token si tu veux gérer la session

// POST /login
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
    const token = jwt.sign({ id: user._id, role: user.role }, "SECRET_KEY", { expiresIn: "1d" });

    // Répondre avec les infos de l'utilisateur et le token
    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });

  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

module.exports = { loginUser };
