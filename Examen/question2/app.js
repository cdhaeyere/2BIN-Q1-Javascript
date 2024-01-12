const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const purchasesRouter = require('./routes/purchases');
const recommandationsRouter = require('./routes/recommandations');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/purchases', purchasesRouter);
app.use('/recommandations', recommandationsRouter)

module.exports = app;
