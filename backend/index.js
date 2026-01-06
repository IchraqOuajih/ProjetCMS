require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const allowedOrigins = [
    "http://127.0.0.1:5500",             // pour le dev local
    "https://projet-cms-kgik.vercel.app" // URL de ton front Vercel
];

app.use(cors({
    origin: function(origin, callback){
        // autoriser les requêtes sans origin (ex: Postman)
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            const msg = "CORS policy: Cette origine n'est pas autorisée";
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connecté ✅"))
.catch(err => console.error("Erreur MongoDB :", err));

// Routes
app.use("/api/pros", require("./models/pro/pro.route"));
app.use("/api/users", require("./models/user/user.route")); // si tu as aussi les users

// Route test pour vérifier que le serveur fonctionne
app.get("/", (req, res) => {
    res.send("Backend Rendezy fonctionne ✅");
});

// Port dynamique pour Heroku
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
});
