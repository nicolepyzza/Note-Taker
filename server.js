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
            id: id1()
        }
        json.push(note);

        // Writing file to array
        fs.writeFile('db/db.json', JSON.stringify(json,null,2), function(error) {
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