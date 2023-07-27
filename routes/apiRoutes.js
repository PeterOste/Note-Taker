const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const dbFilePath = path.join(__dirname, '..', 'db', 'db.json');

// Route that retrieves an existing note.
router.get('/notes', (req, res) => {
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to correctly read note.' });
        }
        const notes = JSON.parse(data);
        res.json(notes);
    });
});

// Route that saves a new note.
router.post('/notes', (req, res) => {
    const { title, text } = req.body;
    if (!title || !text) {
      return res.status(400).json({ error: 'Title and text are required.' });
    }

    fs.readFile(dbFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to correctly read note.' });
      }
      
      const notes = JSON.parse(data);
      const newNote = {
        id: uuidv4(),
        title,
        text,
      };
      
      // Adds new note to notes array.
      notes.push(newNote);
      
      fs.writeFile(dbFilePath, JSON.stringify(notes, null, 2), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to correctly save note.' });
        }
        
        // The notes array is sent as a response, including the new note.
        res.json(newNote);
      });
    });
});

module.exports = router;