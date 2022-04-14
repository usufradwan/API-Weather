/* Global Variables */
const butt = document.getElementById('generate');
const inpZip = document.getElementById('zip');

// Personal API Key for OpenWeatherMap API Location US
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apikey = ',&appid=e76f462d7ad0407d9fb2f5b2aa381a67&units=imperial';
const server = "http://127.0.0.1:3000"

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + ' // ' + d.getMonth()+ ' // '+ d.getFullYear();



            // ********************************************************* //


// Code To Get Data From API
const getdataa = async (zip) => {
    try {
        // Code To Fetch Data
        const req = await fetch(apiURL + zip + apikey);
        const res = await req.json();
        console.log(res);
        return res;
    }catch(err) {
        console.log(err);
    }
};

// Code Post Data From Response Get Data
const postDataa = async (url = "", data = {}) => {
    const res = await fetch(url, {
        method : "POST",
        credentials : "same-origin",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(data)
    });
    try {
        const newData = await res.json();
        return newData;
    }catch(err) {
        console.log(err);
    }
};

// Code To Update UI
const updateUI = async () => {
    const res = await fetch(server + "/getdata");
    try {
        const saveData = await res.json();
        document.getElementById('date').innerHTML = saveData.newDate;
        document.getElementById('temp').innerHTML = saveData.temp + ' &degC';
        document.getElementById('content').innerHTML = saveData.feelings;
    }catch(err) {
        console.log(err);
    };
};

            // ********************************************************* //

// Create Event On Button 
butt.addEventListener('click', () => {

    //get value after click on the button
    const zip = inpZip.value;
    const feelings = document.getElementById("feelings").value;

    // Code IF Condition To Check input Zip is False Or True And Run Functions
    if(!zip) {
        alert('Please Write Zip Code !!');
        console.log('write zip')
    } else {
        console.log('Code');

            // getWeatherData return promise
            getdataa(zip).then((data) => {
                const {main : {temp}} = data;
                postDataa(server + "/postdata", {
                    temp,
                    newDate,
                    feelings,
                });
                updateUI();
            });    
    };
});