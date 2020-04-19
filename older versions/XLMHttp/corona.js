const percentageRecovered = document.querySelector('.percentageRecovered')
const totalRecovered = document.querySelector('.totalRecovered')
const totalConfirmed = document.querySelector('.totalConfirmed')
const url = 'https://api.covid19api.com/summary'


function myFunction() {
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Action to be performed when the document is ready:
       const response = JSON.parse(xhttp.responseText)
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
    }
};
xhttp.open("GET", url, true);
xhttp.send();
}

window.addEventListener('load', myFunction, false);