const Pro = require("./pro.model");

/**
 * 🔹 ROUTE DE TEST (TRÈS IMPORTANTE POUR POSTMAN)
 * GET /api/pros/test
 */
exports.test = (req, res) => {
    res.json({
        message: "Pro controller OK",
        time: new Date()
    });
};

/**
 * 🔹 CREATE PRO
 * POST /api/pros
 */
exports.createPro = async (req, res) => {
    try {
        console.log("BODY REÇU :", req.body);

        const newPro = new Pro(req.body);
        await newPro.save();

        res.status(201).json(newPro);
    } catch (err) {
        console.error("CREATE PRO ERROR :", err);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

/**
 * 🔹 GET ALL PROS
 * GET /api/pros
 */
exports.getAllPros = async (req, res) => {
    try {
        const pros = await Pro.find();
        res.json(pros);
    } catch (err) {
        console.error("GET ALL PROS ERROR :", err);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

/**
 * 🔹 GET PRO BY ID
 * GET /api/pros/:id
 */
exports.getProById = async (req, res) => {
    try {
        const pro = await Pro.findById(req.params.id);

        if (!pro) {
            return res.status(404).json({ message: "Professionnel non trouvé" });
        }

        res.json(pro);
    } catch (err) {
        console.error("GET PRO BY ID ERROR :", err);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

/**
 * 🔹 UPDATE PRO (OPTIONNEL MAIS PRO)
 * PUT /api/pros/:id
 */
exports.updatePro = async (req, res) => {
    try {
        const pro = await Pro.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!pro) {
            return res.status(404).json({ message: "Professionnel non trouvé" });
        }

        res.json(pro);
    } catch (err) {
        console.error("UPDATE PRO ERROR :", err);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

/**
 * 🔹 DELETE PRO (OPTIONNEL)
 * DELETE /api/pros/:id
 */
exports.deletePro = async (req, res) => {
    try {
        const pro = await Pro.findByIdAndDelete(req.params.id);

        if (!pro) {
            return res.status(404).json({ message: "Professionnel non trouvé" });
        }

        res.json({ message: "Professionnel supprimé" });
    } catch (err) {
        console.error("DELETE PRO ERROR :", err);
        res.status(500).json({ message: "Erreur serveur" });
    }
};
