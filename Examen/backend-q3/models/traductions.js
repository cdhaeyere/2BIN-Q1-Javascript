const path = require('node:path');
const { parse, serialize } = require("../utils/json");

const filePath = path.join(__dirname, "/../data/traductions.json");

const addTraduction = (fr, en) => {
    const traductions = parse(filePath, []);
    traductions.push({ fr: fr.toLowerCase(), en: en.toLowerCase() });
    serialize(filePath, traductions);
}

const getFrom = (language, value) => {
    const traductions = parse(filePath, []);
    return traductions.find((word) => word[language].toLowerCase() === value.toLowerCase());
}

const tradFromFrench = (fr) => getFrom("fr", fr)

const tradFromEnglish = (en) => getFrom("en", en)

module.exports = { addTraduction, tradFromFrench, tradFromEnglish };