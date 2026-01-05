const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors({
    origin: "http://127.0.0.1:5500" // ton frontend
}));
app.use(express.json()); 

// Connexion à MongoDB
mongoose.connect("mongodb+srv://ichraq:chlilowa@projetprepfa.gulgzg1.mongodb.net/?appName=ProjetPrePFA")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

// Routes utilisateurs normaux
app.use("/api/users", require("./models/user/user.route"));

// ===== Routes Professionnels =====
app.use("/api/professionals", require("./models/pro/pro.route"));

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
