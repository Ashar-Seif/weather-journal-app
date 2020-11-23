// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes

const express = require('express');

// Start up an instance of app
const app = express();


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

/* Initializing the main project folder */
app.use(express.static('website'));

const port = 8000;


// Setup Server

const server = app.listen(port, listening);

function listening() {
    console.log('server running');
    console.log('running on localhost' + port);
}

//get function
app.get('/all', sendData);


function sendData(request, response) {
    response.send(projectData);
};


//post function

app.post('/addData', addData);

function addData(request, response) {

    let data = request.body;

    console.log('server side data ', data)

    //date
    //temperature -> temperature
    // feelings -> user_responce

    projectData["date"] = data.date;
    projectData["temp"] = data.temperature;
    projectData["feel"] = data.user_response;
    response.send(projectData);
}