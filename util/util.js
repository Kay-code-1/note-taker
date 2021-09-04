const path = require("path");
const fs = require("fs");

const getNotes = () => {
  let content = fs.readFileSync(path.join(__dirname, "../db/db.json"));
  if (content.toString()) return JSON.parse(content);
  return [];
};

const setNotes = (notes) => {
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(notes)
  );
};

module.exports = { getNotes, setNotes };
