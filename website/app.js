/* Global Variables */
const apiKey = '&appid=90409fbfa2cb3b2c25c0d81a37bab5bd&units=imperial'
const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast?zip='
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1)+'.'+ d.getDate()+'.'+ d.getFullYear();

let bttn = document.getElementById('generate')

bttn.addEventListener('click', ()=>{
    let zip = document.getElementById('zip').value;
    let feel = document.getElementById('feelings').value;

    weather(baseUrl, zip, apiKey)
    
        .then((data)=>{
            console.log(data);
            postData('/newData', {temp : data.list[0].main.temp, date : newDate, feel : feel});
            retrieveData();
        })
})

const weather = async (url, zip, key)=>{
    const request = await fetch(url + zip + key);
    try{
        const data = await request.json();
        console.log(data)
        return data;
    }
    catch(error){
        console.log('error', error);
    }
}

const postData = async (url = '', data = {})=>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),        
    });
    try {
        // Transform into JSON
        const finData = await response.json();
        console.log(finData);
        return finData;
        }
        catch(error) {
        console.log('error', error);
          // appropriately handle the error
        }
}

const retrieveData = async () =>{
    const request = await fetch('/data');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
    document.getElementById('content').innerHTML = allData.feel;
    document.getElementById('date').innerHTML =allData.date;
    }
    catch(error) {
    console.log('error', error);
      // appropriately handle the error
    }
}