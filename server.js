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
  fs.readFileSync(path.join(__dirname, './db/db.json') )
  res.json(data)
});

// app.post('/api/notes', (req,res) => {
//   json = req.body;
//   fs.appendFile(path.join('./db/db.json'), JSON.stringify(json), function (err) {
//     if (err) throw err;
//     console.log('The "data to append" was appended to file!');
//  });
// })
app.post('/api/notes', (req,res) => {
  fs.readFile(path.join('./db/db.json'), function (err,test) {
    if (err) return console.error('File read error: ', err)
    let data = JSON.parse(test.toString());
    data.push(req.body);
    console.log(data)
    fs.writeFile('./db/db.json', JSON.stringify(data), (err) => {  // WRITE
      if (err) {
          return console.error(err);
      } else {
          console.log("Success");
      }
    });
  })
})

app.listen(PORT, () => {
  console.log(`Example app listening at https://localhost:${PORT}`);
});
