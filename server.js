const express = require("express");
const path = require("path");
const fs = require("fs");
const { json } = require("body-parser");
const { getNotes, setNotes } = require("./util/util");
const api = require('./routes/index.js');

const PORT = 3001;
const app = express();

app.use(express.static("public"));
app.use(json());

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
