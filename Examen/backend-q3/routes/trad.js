const express = require('express');
const { addTraduction, tradFromFrench, tradFromEnglish } = require('../models/traductions');

const router = express.Router();

router.post("/", (req, res) => {
    if (!req.body || !req.body.fr || !req.body.en) {
        res.sendStatus(400);
        return;
    }

    addTraduction(req.body.fr, req.body.en);
    res.sendStatus(200);
});

router.get("/fr", (req, res) => {
    if (!req.query || !req.query.query) {
        res.sendStatus(400);
        return;
    }

    const trad = tradFromFrench(req.query.query);
    if (trad === undefined) {
        res.sendStatus(404);
        return;
    }

    res.json(trad);
});

router.get("/en", (req, res) => {
    if (!req.query || !req.query.query) {
        res.sendStatus(400);
        return;
    }

    const trad = tradFromEnglish(req.query.query);
    if (trad === undefined) {
        res.sendStatus(404);
        return;
    }

    res.json(trad);
});

module.exports = router;