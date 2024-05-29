const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Hardcoded API key    
const API_KEY = 'my-secret-api-key';

// Middleware to check API key in headers
const authenticate = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey && apiKey === API_KEY) next();
    else res.status(401).json({ message: 'Unauthorized' });
};

let execs = ['Anthony', 'Eddy', 'Eric', 'Pranav', 'Yanzi'];

// GET route to fetch exec names
app.get('/api/exec_names', authenticate, (req, res) => {
    res.json({
        message: 'Welcome to the underworld of most websites',
        execs: execs
    });
});

// Start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


