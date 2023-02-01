const express = require('express');
const path = require('path');
const data = require('./db/db.json');
const fs = require('fs');

const PORT = 3001;

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
  fs.readFileSync( path, options )
  res.json(data)
});

app.post('/api/notes', (req,res) => {
  console.log(req.body)
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
