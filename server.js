var express = require('express');
var path = require('path');
var app = express();
var PORT = process.env.PORT || 8000;
var db = require('./db/db.json');

// const fs = require('fs');
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
// app.delete('/api/notes/:id', function(req, res) {
//     fs.readFile('db/db.json', function(error, data) {
//         if (error) throw error;
//         let deleteID = req.params.id;
//         let json = JSON.parse(data);
//         json.forEach(function(item, i) {
//             if (item.id.includes(deleteID)) {
//                 json.splice(i, 1);
//             }
//         })
//         fs.writeFile('db/db.json', JSON.stringify(json,null,2), function(error) {
//             if (error) throw error;
//             res.send('200');
//         })
//     })
// })

app.listen(PORT, function() {
    console.log("Listening on port: " + PORT);
});