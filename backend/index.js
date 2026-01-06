// Charger les variables d'environnement
require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors({
    origin: "*" // Mettre ton front deployé ici si tu veux restreindre, ex: "https://monfrontend.vercel.app"
}));
app.use(express.json()); 

// Connexion à MongoDB via variable d'environnement
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("Erreur MongoDB :", err));

// Routes utilisateurs
app.use("/api/users", require("./models/user/user.route"));

// Routes professionnels
app.use("/api/professionals", require("./models/pro/pro.route"));

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
