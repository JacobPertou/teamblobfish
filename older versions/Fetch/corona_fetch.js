const percentageRecovered = document.querySelector('.percentageRecovered')
const totalRecovered = document.querySelector('.totalRecovered')
const totalConfirmed = document.querySelector('.totalConfirmed')
const url = 'https://api.covid19api.com/summary'


function getData() {
    console.log('Fetching data from: ' + url);

    fetch(url)  // send a request to the server

    .then(response => { // if a positive response is received
        console.log('Data received: ' + response.status + " " + response.statusText);
        return response.json(); // take the response and read it as JSON
    })
    .then(response => { // finally, here you get your data and you can start working with it
       console.log(response)
       const value1 = response.Countries[59]
       console.log(value1)
       const recovered = response.Countries[59].TotalRecovered
       console.log(recovered)
       totalRecovered.textContent = recovered;
       const confirmed = response.Countries[59].TotalConfirmed
       console.log(confirmed)
       totalConfirmed.textContent = confirmed
       const percentage1 = recovered / confirmed
       console.log(percentage1)
       const percentage2 = Math.round(percentage1 * 100)
       console.log(percentage2)
       percentageRecovered.textContent = `${percentage2}%`
    })
    .catch(err => {
        // If something goes wrong and you don't receive a response from the server
      })
};


window.addEventListener('load', getData, false);

