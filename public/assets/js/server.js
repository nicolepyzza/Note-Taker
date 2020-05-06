const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// GET REQUEST

app.get('/api/notes', function(req, res) {
    fs.readFile('db/db.json', 'utf8', function(error, content) {
        let note = JSON.parse(content);
        res.send(note);
    });
});