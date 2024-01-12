const express = require('express');
const router = express.Router();

const { readAllUsers, getRecommandation } = require('../models/historique.js');

router.post('/:username', (req, res) => {
    const username = req?.params?.username;

    if (!username) return res.status(404).json({ message: "Données manquantes" });

    const users = readAllUsers();
    if (!users.find((e) => e === username)) return res.status(404).json({ message: "Utilisateur non trouvé" });

    const recommandation = getRecommandation(username);
    return res.status(200).json({ recommandation });
});

module.exports = router;