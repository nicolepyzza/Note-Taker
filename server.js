const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const fs = require('fs');
const uuidv4 = require('uuid');
const app =  express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//GET Requests
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
  app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});
app.get('/api/notes', function(req, res) {
  fs.readFile('db/db.json', 'utf8', function(error, contents) {
    if (error) throw error;
    var words = JSON.parse(contents);
    res.send(words);
  });
});

//POST Request
app.post('/api/notes', function(req, res){
  fs.readFile('db/db.json', function(error, data) {
    if (error) throw error;
    let json = JSON.parse(data);
    let note = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4,
    }
    json.push(note); 
    fs.writeFile('db/db.json', JSON.stringify(json, null, 2), function(error) {
      if (error) throw error;
      res.send('200');
    });
  });
});

// DELETE request
app.delete('/api/notes/:id', function(req, res) {
  fs.readFile('db/db.json',function(error, data) {
    if (error) throw error;
    let noteID = req.params.id;
    let json = JSON.parse(data);
    json.forEach((item, i) => {
      if (item.id == noteID){ 
        json.splice(i, 1);       
      }
    });
    fs.writeFile('db/db.json', JSON.stringify(json, null, 2), function (error) {
      if (error) throw error;
      res.send('200');
    });
  });
})

// Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, function() {
    console.log('App listening on port: http://localhost:' + PORT)
});