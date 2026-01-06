const Pro = require("./pro.model");

// Créer un nouveau professionnel
exports.createPro = async (req, res) => {
    try {
        const newPro = new Pro(req.body);
        await newPro.save();
        res.status(201).json({ message: "Professionnel créé avec succès ✅", pro: newPro });
    } catch (err) {
        console.error(err);
        if (err.code === 11000) { // email unique
            return res.status(400).json({ message: "Email déjà utilisé" });
        }
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// Récupérer tous les professionnels
exports.getAllPros = async (req, res) => {
    try {
        const pros = await Pro.find();
        res.json(pros);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// Récupérer un professionnel par son ID
exports.getProById = async (req, res) => {
    try {
        const pro = await Pro.findById(req.params.id);
        if (!pro) return res.status(404).json({ message: "Professionnel non trouvé" });
        res.json(pro);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur" });
    }
};
