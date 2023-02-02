const express = require('express');
const path = require('path');
const data = require('./db/db.json');
const fs = require('fs');

const port = process.env.PORT || 3001

const app = express();


app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static('public'));

//view routes(visible content)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

//routes for data movement with db and response back
app.get('/api/notes', (req, res) => {
  // let noteList = fs.readFileSync(path.join(__dirname, './db/db.json'))
  res.sendFile(path.join(__dirname, './db/db.json'));
});

app.post('/api/notes', (req,res) => {
  let newNote = req.body;
  let noteList = JSON.parse(fs.readFileSync(path.join('./db/db.json')));
  let notelength = (noteList.length).toString();

  newNote.id = notelength;
  noteList.push(newNote);

  fs.writeFile('./db/db.json', JSON.stringify(noteList), (err) => {  // WRITE
    if (err) {
        return console.error(err);
    } else {
        console.log("Added To Json");
    }
  });
  res.json(noteList);
})

//clears all notes couldnt get the ID working
app.delete(`/api/notes/:id`, (req,res) => {
  fs.writeFile('./db/db.json', '[]', (err) => {  // WRITE
    if (err) {
        return console.error(err);
    } else {
        console.log("Cleared All Entries");
    }
  });
})

app.listen(PORT, () => {
  console.log(`Example app listening at https://localhost:${port}`);
});
