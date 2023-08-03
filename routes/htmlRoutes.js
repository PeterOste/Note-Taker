const express = require('express');
const path = require('path');
const router = express.Router();

// Route that serves the index.html.
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Route that serves the notes.html.
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

module.exports = router;