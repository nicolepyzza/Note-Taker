const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// GET REQUEST

app.get('/api/notes', function(req, res) {
    fs.readFile('db/db.json', 'utf8', function(error, content) {
        let words = JSON.parse(content);
        res.send(words);
    });
});

// POST request

app.post('/api/notes', function(req, res) {
    fs.readFile('db/db.json', function (error, data) {
        if (error) throw error;
        let json = JSON.parse(data);
        let note = {
            title: req.body.title,
            text: req.body.text,
        }
        json.push(note);

        // Writing file to array
        fs.writeFile('db/db.json', JSON.stringify(json,null,2), function(error) {
            if (error) throw error;
            res.send('200');
        })
    })
})
