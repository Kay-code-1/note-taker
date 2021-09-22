const express = require('express');

const homeRouter = require('./homeroutes');
const notesRouter = require('./notes');

const app = express();

app.use('./homeroutes', homeRouter);
app.use('/notes', notesRouter);

module.exports = app;
