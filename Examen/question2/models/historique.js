const path = require('node:path');
const { parse, serialize } = require('../utils/json.js');

const { users, products } = require('../constants.js');
const jsonDbPath = path.join(__dirname, '/../data/historique.json');

const defaultHistorique = [];

const readAllUsers = () => {
    return users;
}

const readAllProducts = () => {
    return products;
}

const enregisterAchat = (user, idProduit, quantite) => {
    const historique = parse(jsonDbPath, defaultHistorique);

    const newHistorique = {
        user,
        idProduit,
        quantite
    }

    historique.push(newHistorique);
    serialize(jsonDbPath, historique);
}

const findUser = (idProduit) => {
    let historique = parse(jsonDbPath, defaultHistorique);

    const tableau = [];

    historique = historique.filter((e) => e.idProduit === idProduit);
    if (historique.length === 0) return false;

    historique?.forEach((e) => {
        const user = e.user;
        const quantite = e.quantite;

        const found = tableau.find((el) => el.user === user);

        if (!found) {
            const newTableau = {
                user,
                quantite
            }

            tableau.push(newTableau);
        } else {
            const index = tableau.findIndex((e) => e === found);
            tableau[index].quantite = tableau[index].quantite + quantite;
        }
    });

    console.log(tableau);

    let max = 0;
    tableau?.forEach((e) => {
        if (e.quantite > max) {
            max = e.quantite;
        }
    });

    const found = tableau.find((e) => e.quantite === max);
    return found.user;
}

const getRecommandation = (username) => {
    const random = Math.floor(Math.random() * (products.length - 1)) + 1;
    return products[random];
}

module.exports = {
    readAllUsers,
    readAllProducts,
    enregisterAchat,
    findUser,
    getRecommandation
}