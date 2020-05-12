var express = require('express');
var path = require('path');
var app = express();
var PORT = process.env.PORT || 8000;
var db = require('./db/db.json');

const fs = require('fs');
// const bodyParser = require('body-parser');
// const uuid = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/'))

// GET request
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, '/notes.html'));
});
app.get('/api/notes', function(req, res) {
    return res.json(db);
});

// POST request
app.post('/api/notes', function(req, res) {
    var newNote = req.body;
    console.log(newNote);
    waiting.push(newNote);
    res.json(newNote);
})

// DELETE request
app.delete('/api/notes/:id', function(req, res) {
    let noteId = req.params.id;
    fs.readFile(db, 'utf8', function(error, data) {
        if (error) throw error;

        const allNotes = JSON.parse(data);
        const newAllNotes = allNotes.filter(note => note.id != noteId);

        fs.writeFile(db, JSON.stringify(newAllNotes, null, 2), function(error){
            if (error) throw error;
            res.send(db);
            console.log('Note deleted.');
        })
    })
})

app.listen(PORT, function() {
    console.log("Listening on port: " + PORT);
});