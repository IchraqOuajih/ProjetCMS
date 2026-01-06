// Charger les variables d'environnement depuis .env
require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors({
    origin: "http://127.0.0.1:5500" // ton frontend local (à changer si déployé)
}));
app.use(express.json()); 

// Connexion à MongoDB via variable d'environnement
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connecté ✅"))
    .catch(err => console.error("Erreur MongoDB :", err));

// Routes utilisateurs normaux
app.use("/api/users", require("./models/user/user.route"));

// Routes Professionnels
app.use("/api/professionals", require("./models/pro/pro.route"));

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
});
