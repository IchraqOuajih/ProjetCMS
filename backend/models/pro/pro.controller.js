const Pro = require("./pro.model");


exports.createPro = async (req, res) => {
    try {
        const newPro = new Pro(req.body);
        await newPro.save();
        res.status(201).json(newPro); // on renvoie juste le pro pour test
    } catch (err) {
        console.error("Erreur lors de la création du pro :", err);
        res.status(500).json({ message: err.message }); // renvoie le vrai message d'erreur
    }
};



exports.getAllPros = async (req, res) => {
    try {
        const pros = await Pro.find();
        res.json(pros);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

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
