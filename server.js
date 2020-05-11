const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const uuid = require('uuid');
// let json;

// body parser
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());
app.use(express.static('public'));

// server
const PORT = process.env.PORT || 8000;
app.listen(PORT, function() {
    console.log("Listening on port: " + PORT);
});


// GET REQUEST

app.get('/api/notes', function(req, res) {
    res.send(db);
    // fs.readFile('db/db.json', 'utf8', function(error, content) {
    //     let words = JSON.parse(content);
    //     res.send(words);
    // });

    fs.readFile('/db/db.json', 'utf8', function(error, data) {
        if(error) throw error;

        const allNotes = JSON.parse(data);
        allNotes.push(newNote);

        fs.writeFile('/db/db.json', JSON.stringify(allNotes, null, 2), function(error) {
            if (error) throw error;
            res.send(db);
            console.log("Note saved!");
        })
    })
});

// POST request

app.post('/api/notes', function(req, res) {
    fs.readFile('/db/db.json', function (error, data) {
        if (error) throw error;
        let json = JSON.parse(data);
        let note = {
            title: req.body.title,
            text: req.body.text,
            id: id1()
        }
        json.push(note);

        // Writing file to array
        fs.writeFile('/db/db.json', JSON.stringify(json,null,2), function(error) {
            if (error) throw error;
            res.send('200');
        })
    })
})

// DELETE request

app.delete('/api/notes/:id', function(req, res) {
    fs.readFile('db/db.json', function(error, data) {
        if (error) throw error;
        let deleteID = req.params.id;
        let json = JSON.parse(data);
        json.forEach(function(item, i) {
            if (item.id.includes(deleteID)) {
                json.splice(i, 1);
            }
        })
        fs.writeFile('db/db.json', JSON.stringify(json,null,2), function(error) {
            if (error) throw error;
            res.send('200');
        })
    })
})

// routes
app.get('/', function(req, res) {
    res.sendFile(path.join(_dirname, 'public', 'index.html'));
})

app.get('/', function(req, res) {
    res.sendFile(path.join(_dirname, 'public', 'notes.html'));
})

// get css/js files
app.use(express.static(path.join(__dirname, 'public')));

