const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Hardcoded API key    
const API_KEY = 'my-secret-api-key';

// Middleware to check API key in headers
const authenticate = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey && apiKey === API_KEY) {
        next();
    } else {
        res.status(401).json({
            message: 'Unauthorized'
        });
    }
};

let execs = ['Anthony', 'Eddy', 'Eric', 'Pranav', 'Yanzi'];

// GET route to fetch exec names
app.get('/api/exec_names', authenticate, (req, res) => {
    res.json({
        message: 'Welcome to the underworld of most websites',
        execs: execs
    });
});

// POST route to add a new exec name
app.post('/api/exec_names', authenticate, (req, res) => {
    const newExec = req.body.name;
    if (newExec) {
        execs.push(newExec);
        res.status(201).json({
            message: 'Exec name added successfully',
            execs: execs
        });
    } else {
        res.status(400).json({
            message: 'Invalid request, name is required'
        });
    }
});

// DELETE route to remove an exec name by index
app.delete('/api/exec_names/:index', authenticate, (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (index >= 0 && index < execs.length) {
        execs.splice(index, 1);
        res.json({
            message: 'Exec name deleted successfully',
            execs: execs
        });
    } else {
        res.status(400).json({
            message: 'Invalid index'
        });
    }
});

// Start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});