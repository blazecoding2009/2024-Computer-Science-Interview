const express = require('express');                         // Import the Express module
const app = express();                                      // Create an instance of an Express application

app.use(express.json());                                    // Middleware to parse JSON bodies from incoming requests

const API_KEY = 'my-secret-api-key';                        // Hardcoded API key for simple authentication

const authenticate = (req, res, next) => {                  // Middleware function to check API key in request headers for authentication
    const apiKey   = req.headers['x-api-key'];              // Get the API key from the request headers
    if (apiKey && apiKey === API_KEY) next();               // If the API key exists and matches the hardcoded key, proceed to the next route handler
    else res.status(401).json({ message: 'Unauthorized' }); // Otherwise, respond with a 401 Unauthorized status and a message
};

let execs = ['Anthony', 'Eddy', 'Eric', 'Pranav', 'Yanzi']; // Array to store executive names

app.get('/api/exec_names', authenticate, (req, res) => {    // GET route to fetch executive names, uses the authenticate middleware to protect this route
    res.json({                                              // Respond with a JSON object containing a message and the list of executive names
        message: 'Welcome to the underworld of most websites',
        execs: execs
    });
});

app.listen(3000, () => {                                    // Start the server and listen on port 3000
    console.log('Server is running on port 3000');          // Log a message to the console indicating that the server is running
});
