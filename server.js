const express = require("express");
const path = require("path");
const fs = require("fs");
const { json } = require("body-parser");
const { getNotes, setNotes } = require("./util/util");

const PORT = 3001;
const app = express();

app.use(express.static("public"));
app.use(json());

//Read file contents
let noteData = getNotes();

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

//api for notes
app.get("/api/notes", (req, res) => {
  res.status(200).send(noteData);
});

app.get("/api/notes/:id", (req, res) => {
  const noteId = parseInt(req.params.id, 10);
  if (noteId) {
    const foundNote = noteData.find((n) => n.id === noteId);
    if (foundNote) {
      res.status(200).send(foundNote);
    } else {
      res.status(404).send({});
    }
  } else {
    res.status(400).send("Invalid input");
  }
});

app.post("/api/notes", (req, res) => {
  try {
    console.log(req.body);
    let note = req.body;
    if (Object.keys(note).length) {
      let idArr = noteData.map((n) => n.id);

      if (idArr.length) note["id"] = idArr.sort((a, b) => b - a)[0] + 1;
      else note["id"] = 1;

      noteData.push(note);

      setNotes(noteData);

      res.status(201).send(note);
    } else {
      res.status(400).send("Invalid request");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error. Please check log.");
  }
});

app.put("/api/notes/:id", (req, res) => {
  try {
    console.log(req.body);

    let note = req.body;
    if (Object.keys(note).length) {
      const noteId = parseInt(req.params.id, 10);
      if (noteId) {
        let noteIdx = noteData.findIndex((n) => n.id === noteId);
        console.log(noteIdx);
        if (noteIdx === -1) {
          res.status(404).send('Note not found.');
        } else {
          noteData[noteIdx] = {
            id: noteId,
            title: req.body.title,
            text: req.body.text,
          };
          setNotes(noteData);
  
          note["id"] = noteId;
  
          res.status(200).send(note);
        }
      } else {
        res.status(400).send("Invalid request");
      }
    } else {
      res.status(400).send("Invalid request");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error. Please check log.");
  }
});

app.delete("/api/notes/:id", (req, res) => {
  const noteId = parseInt(req.params.id, 10);
  if (noteId) {
    noteData = noteData.filter((n) => n.id !== noteId);
    setNotes(noteData);
    res.status(200).send("Note deleted");
  } else {
    res.status(400).send("Invalid input");
  }
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
