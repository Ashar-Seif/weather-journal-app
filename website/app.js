/* Global Variables */
const apikey = '53447b562d8d25cc10aeab72b9c4bb3d';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const postURL = 'http://localhost:8000/addData'
const getURL = 'http://localhost:8000/all'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

//Create generate 

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const postCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    console.log(newDate);

    getTemperature(baseURL, postCode, apikey)
        .then(function(data) {
            // Add data to POST request
            postData(postURL, { temperature: data.main.temp, date: newDate, user_response: feelings })
                // Function which updates UI
                .then(function() {
                    updateUI()
                })
        })
}

// Async GET
const getTemperature = async(baseURL, code, key) => {
    const response = await fetch(baseURL + code + ',us' + '&APPID=' + apikey + '&units=imperial')
    console.log(response);
    try {
        const data = await response.json();
        console.log(data);
        console.log('PIRMAS');
        return data;
    } catch (error) {
        console.log('error', error);
    }
}

// Async POST
const postData = async(url = '', data = {}) => {
    const postRequest = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        console.log('ANTRAS');
        const newData = await postRequest.json();
        console.log(newData, 'ANTRAS VEL');
        return newData;
    } catch (error) {
        console.log('Error', error);
    }
}

// Update user interface
const updateUI = async() => {
    const request = await fetch(getURL);
    try {
        const allData = await request.json();
        console.log('TRECIAS');
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.user_response;
    } catch (error) {
        console.log('error', error);
    }
}