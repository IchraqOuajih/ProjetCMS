const Pro = require("./pro.model");

// Créer un pro
exports.createPro = async (req, res) => {
    try {
        const newPro = new Pro(req.body);
        await newPro.save();
        // renvoyer l'objet créé avec son ID
        res.status(201).json(newPro);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// Récupérer un pro par ID
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
