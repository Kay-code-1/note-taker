const notes = require('express').Router();
const { getNotes, setNotes } = require("./util/util");

//Read file contents
let noteData = getNotes();

notes.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

notes.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);