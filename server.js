const express = require('express');
const path = require('path');
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');


const PORT = process.env.PORT || 3001;

const app = express();

// Middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use htmlRoutes.
app.use('/', htmlRoutes);

// Use apiRoutes.
app.use('/api', apiRoutes);

// Start web server.
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);