const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = 3001;
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

//api for notes
app.get('/api/notes', (req, res) => {
    const content = fs.readFileSync(path.join(__dirname, 'db/db.json'));
    return content.toJSON();
});

// app.get('/api/notes/:id', (req, res) => {
//     if(req.params.id) {
//         return
//     }
// });

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
