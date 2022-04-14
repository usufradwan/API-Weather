// Write in Terminal --> npm install --< to install package [express, cors, body-parser] with same version app

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
app.listen(port, function() {
    console.log('Server Is Start On Port ^^ ' + port);
});

// Function Get
app.get("/getdata", function(request, response) {
    response.status(200).send(projectData);
});

// Function Post
app.post("/postdata", function(request, response) {
    projectData = request.body;
    response.status(200).send(projectData);
});
