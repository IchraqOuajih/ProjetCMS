require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// CORS: autoriser le front local ET Vercel
const allowedOrigins = [
    "http://127.0.0.1:5500",             
    "https://projet-cms-kgik.vercel.app"
];

app.use(cors({
    origin: function(origin, callback){
        if(!origin) return callback(null, true); 
        if(allowedOrigins.indexOf(origin) === -1){
            const msg = "CORS policy: Cette origine n'est pas autorisée";
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

// Pour parser le body JSON
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connecté ✅"))
    .catch(err => console.error("Erreur MongoDB :", err));

// --- ROUTES ---
// Route professionnels
app.use("/api/professionals", require("./models/pro/pro.route"));

// Route utilisateurs
app.use("/api/users", require("./models/user/user.route"));

// Route login
app.use("/api/login", require("./models/user/login.route")); // <-- ajoutée

// Route test
app.get("/", (req, res) => {
    res.send("Backend Rendezy fonctionne ✅");
});

// Port dynamique
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
});
