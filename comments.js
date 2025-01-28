// Create web server
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// Create a new comment
app.post('/comments', (req, res) => {
    const comment = req.body;
    fs.readFile(path.join(__dirname, 'comments.json'), (err, data) => {
        if (err) {
            res.status(500).send('Error reading comments');
            return;
        }

        const comments = JSON.parse(data);
        const newComment = {
            id: comments.length + 1,
            content: comment.content,
            user: comment.user,
            date: new Date().toISOString()
        };
        comments.push(newComment);
        fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments), (err) => {
            if (err) {
                res.status(500).send('Error writing comments');
                return;
            }

            res.status(201).send(newComment);
        });
    });
});