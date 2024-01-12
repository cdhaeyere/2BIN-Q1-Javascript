const express = require('express');
const router = express.Router();

const { enregisterAchat, readAllUsers, readAllProducts, findUser, getRecommandation } = require('../models/historique.js');

router.post('/', (req, res) => {
    const user = req?.body?.user;
    const idProduit = req?.body?.idProduit;
    const quantite = req?.body?.quantite;

    if (!user || !idProduit || !quantite) return res.status(404).json({ message: "Données manquantes" });

    const users = readAllUsers();
    if (!users.find((e) => e === user)) return res.status(404).json({ message: "Utilisateur non trouvé" });

    const produits = readAllProducts();
    if (!produits.find((e) => e.id === idProduit)) return res.status(404).json({ message: "Produit non trouvé" });

    if (parseInt(quantite, 10) < 0) {
        return res.status(409).json({ message: "Quantité inférieure à 0" });
    }

    enregisterAchat(user, idProduit, parseInt(quantite, 10));
    return res.sendStatus(200);
});

router.post('/:productId', (req, res) => {
    let idProduit = req?.params?.productId;

    if (!idProduit) return res.status(404).json({ message: "Données manquantes" });

    idProduit = parseInt(idProduit, 10);

    const produits = readAllProducts();
    if (!produits.find((e) => e.id === idProduit)) return res.status(404).json({ message: "Produit non trouvé" });

    const user = findUser(idProduit);

    if (!user) return res.status(404).json({ message: "Aucun utilisateur n'a été trouvé pour ce produit" });
    return res.status(200).json({ user });
}); 

module.exports = router;